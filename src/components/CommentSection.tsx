import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Trash2, User, LogIn } from 'lucide-react';
import { auth, db, googleProvider, signInWithPopup, collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, doc, serverTimestamp } from '@/src/firebase';
import { cn } from '@/src/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  logId: string;
}

export default function CommentSection({ logId }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u: any) => setUser(u));
    
    const q = query(
      collection(db, 'comments'),
      where('logId', '==', logId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(docs);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeComments();
    };
  }, [logId]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'comments'), {
        logId,
        authorName: user.displayName,
        authorUid: user.uid,
        content: newComment.trim(),
        timestamp: serverTimestamp(),
      });
      setNewComment('');
    } catch (error) {
      console.error('Comment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="mt-12 pt-12 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-gray-400" size={24} />
        <h3 className="text-xl font-semibold text-black">Comments ({comments.length})</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all resize-none text-sm"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Posting...' : (
                    <>
                      Post Comment
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-10 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center">
          <p className="text-gray-500 mb-4 text-sm">Sign in with Google to join the conversation.</p>
          <button
            onClick={handleLogin}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
          >
            <LogIn size={18} />
            Sign in with Google
          </button>
        </div>
      )}

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
                <User size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-black">{comment.authorName}</span>
                    <span className="text-xs text-gray-400">
                      {comment.timestamp?.toDate ? formatDistanceToNow(comment.timestamp.toDate(), { addSuffix: true }) : 'just now'}
                    </span>
                  </div>
                  {user?.uid === comment.authorUid && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <p className="text-center text-gray-400 py-10 text-sm italic">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
}
