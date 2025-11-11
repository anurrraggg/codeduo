const { optionService } = require('../services/optionService');

// Create a new option
exports.createOption = async (req, res) => {
	try {
		const option = await optionService.createOption(req.body);
		if (!option) {
			return res.status(401).json({ success: false, message: 'Unable to create option' });
		}
		return res.status(201).json({ success: true, option });
	} catch (error) {
		return res.status(400).json({ success: false, error: 'Internal Server Error', message: error });
	}
};

// Get a option by ID
exports.getOptionById = async (req, res) => {
	try {
		const option = await optionService.findOptionByOptionId(req.params.optionId);
		if (!option) return res.status(404).json({ success: false, message: 'Option not found' });
		return res.status(201).json({ success: true, option });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get a option by option ID
exports.getOptionByOptionId = async (req, res) => {
	try {
		const option = await optionService.findOptionByQuestionId(req.params.id);
		if (!option) return res.status(404).json({ success: false, message: 'Option not found' });
		return res.status(201).json({ success: true, option });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get a option by option ID
exports.getOptionByQuestionId = async (req, res) => {
	try {
		const option = await optionService.findOptionByQuestionId(req.params.optionId);
		if (!option) return res.status(404).json({ success: false, message: 'Option not found' });
		return res.status(201).json({ success: true, option });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get all options
exports.getAllOptions = async (req, res) => {
	try {
		const options = await optionService.findAllOptions();
		if (!options) return res.status(404).json({ success: false, message: 'Options not found' });
		return res.status(201).json({ success: true, options });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Update a option by ID
exports.updateOption = async (req, res) => {
	try {
		const option = await optionService.updateOption(req.params.id, req.body, { new: true });
		if (!option) return res.status(404).json({ success: false, message: 'Option not found' });
		return res.status(201).json({ success: true, option });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Delete a option by ID
exports.deleteOption = async (req, res) => {
	try {
		const option = await optionService.deleteOption(req.params.id);
		if (!option) return res.status(404).json({ success: false, message: 'Option not found' });
		return res.json({ success: true, message: 'Option deleted successfully' });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};
