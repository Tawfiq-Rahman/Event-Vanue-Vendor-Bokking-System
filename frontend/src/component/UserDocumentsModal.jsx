import { useState, useEffect } from 'react';
import { ShieldCheck, X, FileText, ImageOff, ExternalLink } from 'lucide-react';

const DOCUMENT_TYPES = [
  { type: 'government-id', column: 'government_id_document', title: 'Government ID Card', idLabel: 'Gov ID', idField: 'government_id' },
  { type: 'business-license', column: 'business_license_document', title: 'Business License', idLabel: 'License', idField: 'business_license_id' }
];

// Small round profile picture used in the admin user tables
export function UserAvatar({ user }) {
  const [failed, setFailed] = useState(false);

  if (user.profile_picture && !failed) {
    return (
      <img
        src={user.profile_picture}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-black flex items-center justify-center shrink-0">
      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
    </div>
  );
}

function PreviewBox({ children }) {
  return (
    <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="text-center text-gray-400">
      <Icon className="w-10 h-10 mx-auto mb-2" />
      <p className="text-sm font-bold">{text}</p>
    </div>
  );
}

// Popup that lets the admin check a user's profile picture, ID card and business license
export default function UserDocumentsModal({ user, onClose }) {
  const [documents, setDocuments] = useState({});
  const [profileFailed, setProfileFailed] = useState(false);

  const isBusinessRole = user.role === 'vendor' || user.role === 'venue_owner';
  
  // Only show document types that this user actually has, EXCEPT for business-license which we expect business roles to have.
  const documentTypes = DOCUMENT_TYPES.filter((doc) => {
    if (doc.type === 'business-license' && isBusinessRole) return true;
    return !!user[doc.column];
  });

  // Documents are private, so they are fetched through the admin API and shown as local blob URLs
  useEffect(() => {
    let cancelled = false;
    const objectUrls = [];

    documentTypes.forEach(async ({ type, column }) => {
      if (!user[column]) return;
      setDocuments((prev) => ({ ...prev, [type]: { status: 'loading' } }));
      try {
        const res = await fetch(`http://localhost:5000/api/admin/users/${user.id}/documents/${type}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Document request failed');
        const blob = await res.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        objectUrls.push(url);
        setDocuments((prev) => ({ ...prev, [type]: { status: 'ready', url, isPdf: blob.type === 'application/pdf' } }));
      } catch {
        if (!cancelled) setDocuments((prev) => ({ ...prev, [type]: { status: 'error' } }));
      }
    });

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Close with the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const renderDocument = ({ type, title }) => {
    const doc = documents[type];
    if (!doc) return <PreviewBox><EmptyState icon={FileText} text="Not provided" /></PreviewBox>;
    if (doc.status === 'loading') return <PreviewBox><p className="text-sm font-bold text-gray-400">Loading document...</p></PreviewBox>;
    if (doc.status === 'error') return <PreviewBox><EmptyState icon={ImageOff} text="Could not load document" /></PreviewBox>;

    return (
      <>
        <PreviewBox>
          {doc.isPdf
            ? <iframe src={`${doc.url}#toolbar=0&view=Fit`} title={title} className="w-full h-full" />
            : <img src={doc.url} alt={title} className="w-full h-full object-contain" />}
        </PreviewBox>
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Open full size
        </a>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#fffdf8] rounded-3xl border border-white/40 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
          <div>
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Verification Documents
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {user.name} &middot; {user.email} &middot; <span className="capitalize">{user.role ? user.role.replace('_', ' ') : 'Unknown'}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`p-6 overflow-y-auto grid grid-cols-1 gap-6 md:grid-cols-2`}>
          {user.profile_picture && (
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Profile Picture</p>
              <PreviewBox>
                {!profileFailed
                  ? <img src={user.profile_picture} alt={user.name} className="w-full h-full object-contain" onError={() => setProfileFailed(true)} />
                  : <EmptyState icon={ImageOff} text="Could not load picture" />}
              </PreviewBox>
              {!profileFailed && (
                <a
                  href={user.profile_picture}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open full size
                </a>
              )}
            </div>
          )}

          {documentTypes.map((doc) => (
            <div key={doc.type}>
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
                {doc.title}
                {user[doc.idField] && <span className="normal-case tracking-normal font-bold text-gray-700"> &middot; {doc.idLabel}: {user[doc.idField]}</span>}
              </p>
              {renderDocument(doc)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
