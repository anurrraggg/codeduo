import React, { useState } from 'react'
import Header from '@/components/Header'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetPassword } from '@/services/UserService'

export default function ResetPassword() {
    const router = useRouter();
    const params = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const token = params?.get('token') || '';

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (!token) return;
        if (!password) return;
        if (password !== confirm) return;
        setLoading(true);
        try {
            const res = await resetPassword({ token, password });
            if (res.success) router.replace('/login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <form onSubmit={onSubmit} className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-purple-100 rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Set a new password</h2>
                    <input type="password" placeholder="New password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-lg border-b border-gray-200 py-3 px-3" />
                    <input type="password" placeholder="Confirm password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="w-full rounded-lg border-b border-gray-200 py-3 px-3" />
                    <button disabled={loading || !token} className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50">{loading?'Saving...':'Set new password'}</button>
                </form>
            </div>
        </div>
    )
}


