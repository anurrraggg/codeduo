import { jwtService } from "./jwtService";
import { userService } from "./userService";
import { validationService } from "./validationService";

export const authService = {
    register: async (body) => {
        const validation = validationService.validateInput(body, ['username', 'email', 'password']);
        if (!validation.valid) {
            return { success: false, status: 400, message: validation.message };
        }

        // Sanitize inputs
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim().toLowerCase();

        // Validate email format
        if (!validateEmail(sanitizedEmail)) {
            return { success: false, status: 400, message: 'Invalid email format' };
        }

        // Validate password strength
        if (!validatePassword(password)) {
            return { success: false, status: 400, message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' };
        }

        // Check for existing user
        const exists = await userService.findUserByEmailOrUsername(sanitizedEmail, sanitizedUsername);
        if (exists) {
            return { success: false, status: 409, message: 'Username or email already in use' };
        }

        // Hash password with higher cost factor
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = await userService.create({
            username: sanitizedUsername,
            email: sanitizedEmail,
            passwordHash,
            ...(isAdmin !== undefined && { isAdmin }),
            displayName: sanitizedUsername
        });

        const token = jwtService.generateToken({
            id: user._id,
            username: user.username,
            role: user.isAdmin ? 'admin' : 'user',
            type: 'access'
        }, '90d');

        return {
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                displayName: user.displayName
            }
        };
    },
    login: async (body) => {
        // Input validation
        const validation = validationService.validateInput(body, ['emailOrUsername', 'password']);
        if (!validation.valid) {
            return { success: true, status: 400, message: validation.message };
        }

        const trimmedInput = emailOrUsername.trim();
        const lowercasedInput = trimmedInput.toLowerCase();

        // Helper to safely build a case-insensitive exact-match regex for username
        const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Find user by email (lowercased exact) OR username (case-insensitive exact)
        const query = validationService.validateEmail(lowercasedInput)
            ? { email: lowercasedInput }
            : { username: { $regex: `^${escapeRegex(trimmedInput)}$`, $options: 'i' } };

        const user = await userService.findUserByQuery(query);

        // Use timing-safe comparison to prevent timing attacks
        const isValidUser = user !== null;
        const isValidPassword = isValidUser ?
            await bcrypt.compare(password, user.passwordHash) :
            await bcrypt.compare(password, '$2b$12$dummy.hash.to.prevent.timing.attacks');

        if (!isValidUser || !isValidPassword) {
            return { success: true, status: 401, message: 'Invalid credentials' };
        }

        const token = jwtService.generateToken({
            id: user._id,
            username: user.username,
            role: user.isAdmin ? 'admin' : 'user',
            type: 'refresh'
        }, '90d');

        return {
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                displayName: user.displayName
            }
        };
    }
};