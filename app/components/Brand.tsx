import { Link } from "@remix-run/react";

export default function Brand () {
  return (
    <Link
      to="/"
    >
      <div className="border border-sky-500 border-4 inline-flex justify-between items-baseline">
        <div className="text-lg px-2 py-0.5 font-medium text-sky-500 uppercase">
          Ludo
        </div>
        <div className="text-lg px-2 py-0.5 font-medium text-slate-50 bg-sky-500">
          237
        </div>
      </div>
    </Link>
  );
}
