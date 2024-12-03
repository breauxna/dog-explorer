import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/16/solid";

type PaginatorProps = {
  curPage: number;
  totalPageCount: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function Paginator({ curPage, totalPageCount, onNextPage, onPrevPage }: PaginatorProps) {
  return  (
    <div className="flex items-center gap-8">
      <button 
        aria-label="Previous Page"
        disabled={curPage <= 1} 
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
        onClick={onPrevPage}
      >
        <ArrowLongLeftIcon className="h-5 w-5" />
      </button>
    
      <p className="text-slate-600">
        Page <strong className="text-slate-800">{curPage}</strong> of&nbsp;<strong className="text-slate-800">{totalPageCount}</strong>
      </p>
      
      <button 
        aria-label="Next Page"
        disabled={curPage >= totalPageCount} 
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
        onClick={onNextPage}
      >
        <ArrowLongRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}