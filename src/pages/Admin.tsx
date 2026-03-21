import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, KeyRound, LogIn, LogOut, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { auth, collection, db, deleteDoc, doc, googleProvider, onSnapshot, setDoc, signInWithPopup, signOut } from '@/src/firebase';
import { useLanguage } from '../context/LanguageContext';
import {
  AdminCollectionKey,
  getAdminItemMeta,
  getAdminItemTitle,
  getLibuAdminEmails,
  isLibuAdminEmail,
  joinLines,
  slugify,
  sortAdminItems,
  splitLines,
} from '../lib/libuAdmin';

type AdminDraft = Record<string, unknown>;

const tabs: { key: AdminCollectionKey; zh: string; en: string }[] = [
  { key: 'dailyLogs', zh: '日志', en: 'Logs' },
  { key: 'workflows', zh: '工作流', en: 'Workflows' },
  { key: 'agents', zh: '智能体', en: 'Agents' },
  { key: 'products', zh: '产品', en: 'Products' },
];

export default function Admin() {
  const { language } = useLanguage();
  const [user, setUser] = useState(auth.currentUser);
  const [activeTab, setActiveTab] = useState<AdminCollectionKey>('dailyLogs');
  const [items, setItems] = useState<AdminDraft[]>([]);
  const [draft, setDraft] = useState<AdminDraft>(createEmptyDraft('dailyLogs'));
  const [isNew, setIsNew] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const adminEmails = useMemo(() => getLibuAdminEmails(), []);
  const isAdmin = isLibuAdminEmail(user?.email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((nextUser) => setUser(nextUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, activeTab), (snapshot) => {
      const nextItems = sortAdminItems(
        activeTab,
        snapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
      );
      setItems(nextItems);
      setLoading(false);
    });

    setDraft(createEmptyDraft(activeTab));
    setIsNew(true);
    setStatus(null);

    return () => unsubscribe();
  }, [activeTab]);

  const title = language === 'en' ? 'Libu Backoffice' : '礼部后台';
  const subtitle =
    language === 'en'
      ? 'Libu can now curate agents, workflows, logs, and products directly in Firestore.'
      : '礼部现在可以直接在 Firestore 里维护智能体、工作流、日志与产品。';

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        text: language === 'en' ? 'Google sign-in failed.' : 'Google 登录失败。',
      });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setStatus(null);
  };

  const handleCreate = () => {
    setDraft(createEmptyDraft(activeTab));
    setIsNew(true);
    setStatus(null);
  };

  const handleSelect = (item: AdminDraft) => {
    setDraft(serializeDraft(activeTab, item));
    setIsNew(false);
    setStatus(null);
  };

  const handleChange = (field: string, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    if (!isAdmin) return;

    setSaving(true);
    setStatus(null);
    try {
      const parsed = parseDraft(activeTab, draft);
      const docId = String(parsed.id ?? '').trim();

      if (!docId) {
        throw new Error(language === 'en' ? 'Please provide a document ID.' : '请先填写文档 ID。');
      }

      const { id, ...payload } = parsed;
      await setDoc(doc(db, activeTab, docId), payload, { merge: true });
      setDraft(serializeDraft(activeTab, { id: docId, ...payload }));
      setIsNew(false);
      setStatus({
        type: 'success',
        text: language === 'en' ? 'Saved successfully.' : '保存成功。',
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        text: error instanceof Error ? error.message : language === 'en' ? 'Save failed.' : '保存失败。',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) return;

    const currentId = String(draft.id ?? '').trim();
    if (!currentId) return;

    setSaving(true);
    setStatus(null);
    try {
      await deleteDoc(doc(db, activeTab, currentId));
      setDraft(createEmptyDraft(activeTab));
      setIsNew(true);
      setStatus({
        type: 'success',
        text: language === 'en' ? 'Deleted successfully.' : '删除成功。',
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        text: language === 'en' ? 'Delete failed.' : '删除失败。',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 pt-32 pb-32">
      <header className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/10 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand"
        >
          <ShieldCheck size={16} />
          {title}
        </motion.div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-black">{title}</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-500">{subtitle}</p>
          </div>
          <GlassCard className="space-y-3 border-brand/10 lg:w-[360px]">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {language === 'en' ? 'Operator status' : '当前操作者'}
            </div>
            {user ? (
              <>
                <div className="text-sm text-black">{user.email}</div>
                <div className={`text-sm font-medium ${isAdmin ? 'text-brand' : 'text-red-500'}`}>
                  {isAdmin
                    ? language === 'en'
                      ? 'Libu write access is available.'
                      : '礼部写权限已开放。'
                    : language === 'en'
                      ? 'This account can view the backoffice but cannot write.'
                      : '当前账号可以看后台，但没有写入权限。'}
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-black"
                >
                  <LogOut size={16} />
                  {language === 'en' ? 'Sign out' : '退出登录'}
                </button>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-500">
                  {language === 'en'
                    ? 'Sign in with the Libu operator account to edit live content.'
                    : '请使用礼部操作账号登录，才能编辑线上内容。'}
                </div>
                <button
                  onClick={handleLogin}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  <LogIn size={16} />
                  {language === 'en' ? 'Sign in with Google' : '使用 Google 登录'}
                </button>
              </>
            )}
          </GlassCard>
        </div>
      </header>

      {!user ? (
        <GlassCard className="space-y-4 border-dashed border-gray-200 text-center">
          <KeyRound className="mx-auto text-brand" size={28} />
          <div className="text-lg font-semibold text-black">
            {language === 'en' ? 'Libu needs to log in first.' : '礼部需要先登录。'}
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500">
            {language === 'en'
              ? 'After sign-in, this page becomes the operating desk for agents, workflows, logs, and products.'
              : '登录后，这里就会变成礼部维护智能体、工作流、日志和产品的操作台。'}
          </p>
        </GlassCard>
      ) : !isAdmin ? (
        <GlassCard className="space-y-4 border-red-200 bg-red-50/60">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle size={20} />
            <div className="text-lg font-semibold">
              {language === 'en' ? 'Write access is still locked.' : '写权限仍然锁着。'}
            </div>
          </div>
          <p className="text-sm leading-relaxed text-red-700/80">
            {language === 'en'
              ? `Firestore rules currently trust these operator emails: ${adminEmails.join(', ')}`
              : `当前 Firestore 规则信任这些操作邮箱：${adminEmails.join('，')}`}
          </p>
        </GlassCard>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <GlassCard className="space-y-4 border-brand/10">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {language === 'en' ? 'Collections' : '内容集合'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => {
                  const active = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                        active
                          ? 'bg-brand text-white shadow-lg shadow-brand/20'
                          : 'bg-gray-50 text-gray-500 hover:bg-brand/5 hover:text-brand'
                      }`}
                    >
                      {language === 'en' ? tab.en : tab.zh}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-brand/20 hover:text-brand"
              >
                <Plus size={16} />
                {language === 'en' ? 'New entry' : '新建条目'}
              </button>
            </GlassCard>

            <GlassCard className="space-y-4 border-brand/5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {language === 'en' ? 'Existing entries' : '现有条目'}
                </div>
                <div className="text-xs font-medium text-gray-400">{items.length}</div>
              </div>
              {loading ? (
                <div className="text-sm text-gray-400">{language === 'en' ? 'Loading...' : '加载中...'}</div>
              ) : items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-6 text-sm text-gray-400">
                  {language === 'en' ? 'No content yet.' : '还没有内容。'}
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => {
                    const currentId = String(draft.id ?? '');
                    const itemId = String(item.id ?? '');
                    const active = !isNew && currentId === itemId;
                    return (
                      <button
                        key={itemId}
                        onClick={() => handleSelect(item)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                          active
                            ? 'border-brand/20 bg-brand/5'
                            : 'border-transparent bg-gray-50 hover:border-brand/10 hover:bg-white'
                        }`}
                      >
                        <div className="text-sm font-semibold text-black">
                          {getAdminItemTitle(activeTab, item)}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {getAdminItemMeta(activeTab, item)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </GlassCard>
          </aside>

          <main>
            <GlassCard className="space-y-8 border-brand/10">
              <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {language === 'en' ? 'Editor' : '编辑器'}
                  </div>
                  <h2 className="text-3xl font-bold text-black">
                    {isNew
                      ? language === 'en'
                        ? 'Create a new entry'
                        : '新建内容'
                      : language === 'en'
                        ? 'Edit current entry'
                        : '编辑当前内容'}
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {language === 'en'
                      ? 'Libu can edit live content here without leaving the front-end.'
                      : '礼部可以直接在这里维护线上内容，不用离开当前前端。'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
                  >
                    <Save size={16} />
                    {saving
                      ? language === 'en'
                        ? 'Saving...'
                        : '保存中...'
                      : language === 'en'
                        ? 'Save'
                        : '保存'}
                  </button>
                  {!isNew && (
                    <button
                      onClick={handleDelete}
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={16} />
                      {language === 'en' ? 'Delete' : '删除'}
                    </button>
                  )}
                </div>
              </div>

              {status && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status.text}
                </div>
              )}

              {renderEditor(activeTab, draft, handleChange, language)}
            </GlassCard>
          </main>
        </div>
      )}
    </div>
  );
}

function renderEditor(
  activeTab: AdminCollectionKey,
  draft: AdminDraft,
  handleChange: (field: string, value: string) => void,
  language: 'en' | 'zh',
) {
  switch (activeTab) {
    case 'dailyLogs':
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="ID" hint={language === 'en' ? 'Use a stable slug like 2026-03-21-ops' : '建议用稳定 slug，比如 2026-03-21-ops'}>
            <input value={String(draft.id ?? '')} onChange={(e) => handleChange('id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Date' : '日期'}>
            <input type="date" value={String(draft.date ?? '')} onChange={(e) => handleChange('date', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Title' : '标题'} className="md:col-span-2">
            <input value={String(draft.title ?? '')} onChange={(e) => handleChange('title', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Summary' : '摘要'} className="md:col-span-2">
            <textarea value={String(draft.summary ?? '')} onChange={(e) => handleChange('summary', e.target.value)} className={textAreaClass} rows={3} />
          </Field>
          <Field label={language === 'en' ? 'Main content' : '正文'} className="md:col-span-2">
            <textarea value={String(draft.content ?? '')} onChange={(e) => handleChange('content', e.target.value)} className={textAreaClass} rows={8} />
          </Field>
          <Field label={language === 'en' ? 'Tasks completed' : '已完成任务'} hint={language === 'en' ? 'One line per item' : '每行一项'}>
            <textarea value={String(draft.tasksCompletedText ?? '')} onChange={(e) => handleChange('tasksCompletedText', e.target.value)} className={textAreaClass} rows={8} />
          </Field>
          <Field label={language === 'en' ? 'Iteration details' : '迭代细节'}>
            <textarea value={String(draft.iterationDetails ?? '')} onChange={(e) => handleChange('iterationDetails', e.target.value)} className={textAreaClass} rows={8} />
          </Field>
          <Field label={language === 'en' ? 'Revenue generated' : '当日收入'}>
            <input type="number" value={String(draft.revenueGenerated ?? 0)} onChange={(e) => handleChange('revenueGenerated', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Tags' : '标签'} hint={language === 'en' ? 'One line per tag' : '每行一个标签'}>
            <textarea value={String(draft.tagsText ?? '')} onChange={(e) => handleChange('tagsText', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
        </div>
      );
    case 'workflows':
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="ID">
            <input value={String(draft.id ?? '')} onChange={(e) => handleChange('id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Icon name' : '图标名'} hint="Search / Video / FileText">
            <input value={String(draft.icon ?? '')} onChange={(e) => handleChange('icon', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Title' : '标题'} className="md:col-span-2">
            <input value={String(draft.title ?? '')} onChange={(e) => handleChange('title', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Description' : '简介'} className="md:col-span-2">
            <textarea value={String(draft.description ?? '')} onChange={(e) => handleChange('description', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
          <Field
            label={language === 'en' ? 'Workflow steps JSON' : '步骤 JSON'}
            hint={language === 'en' ? 'Array of { title, agent, description, output }' : '数组格式：{ title, agent, description, output }'}
            className="md:col-span-2"
          >
            <textarea value={String(draft.stepsText ?? '')} onChange={(e) => handleChange('stepsText', e.target.value)} className={textAreaClass} rows={14} />
          </Field>
          <Field label={language === 'en' ? 'Implementation notes' : '实现说明'} className="md:col-span-2">
            <textarea value={String(draft.implementationNotes ?? '')} onChange={(e) => handleChange('implementationNotes', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
          <Field label={language === 'en' ? 'Input demo' : '输入示例'}>
            <textarea value={String(draft.inputDemo ?? '')} onChange={(e) => handleChange('inputDemo', e.target.value)} className={textAreaClass} rows={5} />
          </Field>
          <Field label={language === 'en' ? 'Output demo' : '输出示例'}>
            <textarea value={String(draft.outputDemo ?? '')} onChange={(e) => handleChange('outputDemo', e.target.value)} className={textAreaClass} rows={5} />
          </Field>
        </div>
      );
    case 'agents':
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="ID">
            <input value={String(draft.id ?? '')} onChange={(e) => handleChange('id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Avatar URL' : '头像 URL'}>
            <input value={String(draft.avatar ?? '')} onChange={(e) => handleChange('avatar', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Name' : '名称'}>
            <input value={String(draft.name ?? '')} onChange={(e) => handleChange('name', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Role' : '角色'}>
            <input value={String(draft.role ?? '')} onChange={(e) => handleChange('role', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Description' : '简介'} className="md:col-span-2">
            <textarea value={String(draft.description ?? '')} onChange={(e) => handleChange('description', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
          <Field label={language === 'en' ? 'Long description' : '详细介绍'} className="md:col-span-2">
            <textarea value={String(draft.longDescription ?? '')} onChange={(e) => handleChange('longDescription', e.target.value)} className={textAreaClass} rows={6} />
          </Field>
          <Field label={language === 'en' ? 'Skills' : '技能'} hint={language === 'en' ? 'One line per skill' : '每行一个技能'}>
            <textarea value={String(draft.skillsText ?? '')} onChange={(e) => handleChange('skillsText', e.target.value)} className={textAreaClass} rows={8} />
          </Field>
          <Field label={language === 'en' ? 'Achievements' : '成就'} hint={language === 'en' ? 'One line per achievement' : '每行一项'}>
            <textarea value={String(draft.achievementsText ?? '')} onChange={(e) => handleChange('achievementsText', e.target.value)} className={textAreaClass} rows={8} />
          </Field>
          <Field label={language === 'en' ? 'Config summary' : '配置摘要'}>
            <textarea value={String(draft.configSummary ?? '')} onChange={(e) => handleChange('configSummary', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
          <Field label={language === 'en' ? 'Scale summary' : 'Scale 摘要'}>
            <textarea value={String(draft.scaleSummary ?? '')} onChange={(e) => handleChange('scaleSummary', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
          <Field label={language === 'en' ? 'Download URL' : '下载链接'}>
            <input value={String(draft.downloadUrl ?? '')} onChange={(e) => handleChange('downloadUrl', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Repo URL' : '仓库链接'}>
            <input value={String(draft.repoUrl ?? '')} onChange={(e) => handleChange('repoUrl', e.target.value)} className={inputClass} />
          </Field>
        </div>
      );
    case 'products':
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="ID">
            <input value={String(draft.id ?? '')} onChange={(e) => handleChange('id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Category' : '分类'}>
            <input value={String(draft.category ?? '')} onChange={(e) => handleChange('category', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Name' : '名称'}>
            <input value={String(draft.name ?? '')} onChange={(e) => handleChange('name', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Price' : '价格'}>
            <input type="number" value={String(draft.price ?? 0)} onChange={(e) => handleChange('price', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Description' : '简介'} className="md:col-span-2">
            <textarea value={String(draft.description ?? '')} onChange={(e) => handleChange('description', e.target.value)} className={textAreaClass} rows={4} />
          </Field>
          <Field label={language === 'en' ? 'Long description' : '详细介绍'} className="md:col-span-2">
            <textarea value={String(draft.longDescription ?? '')} onChange={(e) => handleChange('longDescription', e.target.value)} className={textAreaClass} rows={6} />
          </Field>
          <Field label={language === 'en' ? 'Product URL' : '产品链接'}>
            <input value={String(draft.link ?? '')} onChange={(e) => handleChange('link', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Image URL' : '图片链接'}>
            <input value={String(draft.image ?? '')} onChange={(e) => handleChange('image', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Payment link' : '支付链接'}>
            <input value={String(draft.paymentLink ?? '')} onChange={(e) => handleChange('paymentLink', e.target.value)} className={inputClass} />
          </Field>
          <Field label={language === 'en' ? 'Agents involved' : '参与智能体'} hint={language === 'en' ? 'One line per agent' : '每行一个智能体'}>
            <textarea value={String(draft.agentsInvolvedText ?? '')} onChange={(e) => handleChange('agentsInvolvedText', e.target.value)} className={textAreaClass} rows={6} />
          </Field>
          <Field label={language === 'en' ? 'Features' : '功能列表'} hint={language === 'en' ? 'One line per feature' : '每行一个功能'} className="md:col-span-2">
            <textarea value={String(draft.featuresText ?? '')} onChange={(e) => handleChange('featuresText', e.target.value)} className={textAreaClass} rows={8} />
          </Field>
        </div>
      );
  }
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block space-y-2 ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-black">{label}</span>
        {hint ? <span className="text-xs text-gray-400">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-brand/20 focus:ring-2 focus:ring-brand/10';

const textAreaClass =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-brand/20 focus:ring-2 focus:ring-brand/10';

function createEmptyDraft(collectionKey: AdminCollectionKey): AdminDraft {
  switch (collectionKey) {
    case 'dailyLogs':
      return {
        id: '',
        date: new Date().toISOString().slice(0, 10),
        title: '',
        summary: '',
        content: '',
        tasksCompletedText: '',
        revenueGenerated: 0,
        iterationDetails: '',
        tagsText: '',
      };
    case 'workflows':
      return {
        id: '',
        title: '',
        description: '',
        icon: 'Search',
        stepsText: JSON.stringify(
          [
            { title: '', agent: '', description: '', output: '' },
          ],
          null,
          2,
        ),
        implementationNotes: '',
        inputDemo: '',
        outputDemo: '',
      };
    case 'agents':
      return {
        id: '',
        name: '',
        role: '',
        description: '',
        longDescription: '',
        avatar: '',
        skillsText: '',
        achievementsText: '',
        configSummary: '',
        scaleSummary: '',
        downloadUrl: '',
        repoUrl: '',
      };
    case 'products':
      return {
        id: '',
        name: '',
        category: '',
        description: '',
        longDescription: '',
        link: '',
        image: '',
        price: 0,
        paymentLink: '',
        agentsInvolvedText: '',
        featuresText: '',
      };
  }
}

function serializeDraft(collectionKey: AdminCollectionKey, item: AdminDraft): AdminDraft {
  switch (collectionKey) {
    case 'dailyLogs':
      return {
        ...item,
        id: String(item.id ?? ''),
        tasksCompletedText: joinLines(item.tasksCompleted as string[] | undefined),
        tagsText: joinLines(item.tags as string[] | undefined),
      };
    case 'workflows':
      return {
        ...item,
        id: String(item.id ?? ''),
        stepsText: JSON.stringify((item.steps as unknown[]) ?? [], null, 2),
      };
    case 'agents':
      return {
        ...item,
        id: String(item.id ?? ''),
        skillsText: joinLines(item.skills as string[] | undefined),
        achievementsText: joinLines(item.achievements as string[] | undefined),
      };
    case 'products':
      return {
        ...item,
        id: String(item.id ?? ''),
        agentsInvolvedText: joinLines(item.agentsInvolved as string[] | undefined),
        featuresText: joinLines(item.features as string[] | undefined),
      };
  }
}

function parseDraft(collectionKey: AdminCollectionKey, draft: AdminDraft) {
  switch (collectionKey) {
    case 'dailyLogs': {
      const id = String(draft.id || slugify(String(draft.date ?? 'log')));
      return {
        id,
        date: String(draft.date ?? ''),
        title: String(draft.title ?? '').trim(),
        summary: String(draft.summary ?? '').trim(),
        content: String(draft.content ?? '').trim(),
        tasksCompleted: splitLines(String(draft.tasksCompletedText ?? '')),
        revenueGenerated: Number(draft.revenueGenerated ?? 0),
        iterationDetails: String(draft.iterationDetails ?? '').trim(),
        tags: splitLines(String(draft.tagsText ?? '')),
      };
    }
    case 'workflows': {
      let steps: unknown = [];
      try {
        steps = JSON.parse(String(draft.stepsText ?? '[]'));
      } catch {
        throw new Error('步骤 JSON 解析失败，请检查格式。');
      }

      if (!Array.isArray(steps)) {
        throw new Error('步骤 JSON 必须是数组。');
      }

      return {
        id: String(draft.id || slugify(String(draft.title ?? 'workflow'))),
        title: String(draft.title ?? '').trim(),
        description: String(draft.description ?? '').trim(),
        icon: String(draft.icon ?? 'Search').trim(),
        steps,
        implementationNotes: String(draft.implementationNotes ?? '').trim(),
        inputDemo: String(draft.inputDemo ?? '').trim(),
        outputDemo: String(draft.outputDemo ?? '').trim(),
      };
    }
    case 'agents':
      return {
        id: String(draft.id || slugify(String(draft.name ?? 'agent'))),
        name: String(draft.name ?? '').trim(),
        role: String(draft.role ?? '').trim(),
        description: String(draft.description ?? '').trim(),
        longDescription: String(draft.longDescription ?? '').trim(),
        avatar: String(draft.avatar ?? '').trim(),
        skills: splitLines(String(draft.skillsText ?? '')),
        achievements: splitLines(String(draft.achievementsText ?? '')),
        configSummary: String(draft.configSummary ?? '').trim(),
        scaleSummary: String(draft.scaleSummary ?? '').trim(),
        downloadUrl: String(draft.downloadUrl ?? '').trim(),
        repoUrl: String(draft.repoUrl ?? '').trim(),
      };
    case 'products':
      return {
        id: String(draft.id || slugify(String(draft.name ?? 'product'))),
        name: String(draft.name ?? '').trim(),
        category: String(draft.category ?? '').trim(),
        description: String(draft.description ?? '').trim(),
        longDescription: String(draft.longDescription ?? '').trim(),
        link: String(draft.link ?? '').trim(),
        image: String(draft.image ?? '').trim(),
        price: Number(draft.price ?? 0),
        paymentLink: String(draft.paymentLink ?? '').trim(),
        agentsInvolved: splitLines(String(draft.agentsInvolvedText ?? '')),
        features: splitLines(String(draft.featuresText ?? '')),
      };
  }
}
