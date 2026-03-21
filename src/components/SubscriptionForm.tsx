import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, addDoc, serverTimestamp } from '@/src/firebase';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, 'subscriptions'), {
        email,
        timestamp: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4 p-8 bg-emerald-50 rounded-3xl border border-emerald-100"
          >
            <CheckCircle2 className="text-emerald-500" size={48} />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-emerald-900">Subscribed!</h3>
              <p className="text-emerald-700">You're on the list for OpenClaw updates.</p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm font-medium text-emerald-900 hover:underline"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="flex items-center gap-2 p-2 bg-white/50 backdrop-blur-md border border-gray-200 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all">
              <div className="pl-4 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-2 outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-black text-white p-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={20} />
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="absolute -bottom-6 left-6 text-xs text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
