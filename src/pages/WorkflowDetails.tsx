import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, Layers, Users } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { getAgentById, getProductById, getWorkflowById, localize } from '../lib/content';

export default function WorkflowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const workflow = getWorkflowById(id);

  if (!workflow) {
    return (
      <div className="pt-32 pb-32 text-center">
        <h2 className="text-2xl font-bold">{language === 'en' ? 'Workflow not found' : '未找到工作流'}</h2>
        <button onClick={() => navigate('/workflow')} className="mt-4 text-brand flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} />
          {language === 'en' ? 'Back to Workflows' : '返回工作流列表'}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto space-y-12">
      <button onClick={() => navigate('/workflow')} className="text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        {language === 'en' ? 'Back to Workflows' : '返回工作流列表'}
      </button>

      <header className="space-y-4">
        <div className="inline-flex rounded-full border border-brand/10 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-brand">
          {language === 'en' ? 'Workflow detail' : '工作流详情'}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-black">{localize(workflow.title, language)}</h1>
        <p className="max-w-3xl text-xl text-gray-500">{localize(workflow.description, language)}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-8 border-brand/5">
          <div className="flex items-center gap-2 text-brand">
            <Layers size={18} />
            <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Agent coordination flow' : '智能体协作流程图'}</h2>
          </div>
          <div className="space-y-6">
            {workflow.steps.map((step, index) => {
              const agent = getAgentById(step.agentId);
              return (
                <div key={`${step.agentId}-${index}`} className="relative pl-10">
                  {index < workflow.steps.length - 1 && <div className="absolute left-[15px] top-10 h-[calc(100%+16px)] w-px bg-brand/15" />}
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-black">{localize(step.title, language)}</h3>
                        <div className="mt-1 text-sm font-medium text-brand">
                          {agent ? localize(agent.name, language) : step.agentId}
                        </div>
                      </div>
                      <div className="rounded-full border border-brand/10 bg-white px-3 py-1 text-xs font-medium text-gray-500">
                        {language === 'en' ? 'Output' : '产出'}: {localize(step.output, language)}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{localize(step.description, language)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="space-y-4 border-brand/5">
            <div className="flex items-center gap-2 text-brand">
              <Users size={18} />
              <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Workflow purpose' : '流程目标'}</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">{localize(workflow.objective, language)}</p>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Implementation notes' : '实现说明'}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{localize(workflow.implementationNotes, language)}</p>
          </GlassCard>

          {workflow.relatedProductIds.length > 0 && (
            <GlassCard className="space-y-4 border-brand/5">
              <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Related products' : '关联产品'}</h2>
              <div className="space-y-3">
                {workflow.relatedProductIds.map((productId) => {
                  const product = getProductById(productId);
                  if (!product) return null;
                  return (
                    <Link key={productId} to={`/products/${productId}`} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-colors hover:border-brand/20 hover:text-brand">
                      {localize(product.name, language)}
                      <ExternalLink size={16} />
                    </Link>
                  );
                })}
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="space-y-4 border-brand/5">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            {localize(workflow.inputDemo.title, language)}
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
            {workflow.inputDemo.content}
          </pre>
        </GlassCard>

        <GlassCard className="space-y-4 border-brand/5">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            {localize(workflow.outputDemo.title, language)}
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
            {workflow.outputDemo.content}
          </pre>
        </GlassCard>
      </div>

      <GlassCard className="space-y-4 border-brand/5">
        <h2 className="text-xl font-bold text-black">{language === 'en' ? 'What this workflow proves' : '这个工作流证明了什么'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {workflow.results.map((result) => (
            <div key={result.zh} className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
              <CheckCircle2 size={18} className="shrink-0 text-brand" />
              <span>{localize(result, language)}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
