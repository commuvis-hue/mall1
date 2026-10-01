import { useStore } from '../store';
import { Link } from '../router';
import { CheckIcon } from './Icons';

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="toast" role="status" key={toast.key}>
      <span className="toast-check"><CheckIcon width={16} height={16} /></span>
      <span>{toast.message}</span>
      {toast.action && <Link to={toast.action.to}>{toast.action.label}</Link>}
    </div>
  );
}
