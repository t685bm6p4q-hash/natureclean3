import { useSearchParams } from 'react-router';
import { Globe, ShieldAlert } from 'lucide-react';
import { SiteAuditPage } from '@/app/pages/SiteAuditPage';
import { SecurityAuditPage } from '@/app/pages/SecurityAuditPage';

type AuditTab = 'site' | 'security';

/**
 * Hub admin — audit site (SEO, perf, code) + audit sécurité détaillé.
 * Anciennes URLs /admin/site-audit et /admin/security-audit redirigent ici.
 */
export function AdminAuditsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: AuditTab = searchParams.get('tab') === 'security' ? 'security' : 'site';

  const setTab = (next: AuditTab) => {
    setSearchParams(next === 'site' ? {} : { tab: next }, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Audits internes</span>
          <button
            type="button"
            onClick={() => setTab('site')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border transition-colors ${
              tab === 'site'
                ? 'bg-slate-900 text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            Site (SEO, perf, code)
          </button>
          <button
            type="button"
            onClick={() => setTab('security')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border transition-colors ${
              tab === 'security'
                ? 'bg-slate-900 text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            Sécurité (SEC)
          </button>
        </div>
      </div>

      {tab === 'site' ? <SiteAuditPage embedded /> : <SecurityAuditPage embedded />}
    </div>
  );
}
