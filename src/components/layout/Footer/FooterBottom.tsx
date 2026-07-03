export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-[13px] text-[#6B7280] font-normal tracking-normal">
      
      {/* Copyright Information */}
      <div className="flex items-center space-x-1.5">
        <span>&copy; {year} RentEase Inc.</span>
        <span className="text-slate-300">|</span>
        <span className="text-[#6B7280]/80">All rights reserved.</span>
      </div>

      {/* Legal & Compliance Links - Vital for a premium, trustworthy look */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
        <a 
          href="/privacy" 
          className="hover:text-[#2563EB] transition-colors duration-200 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[#2563EB] after:transition-all after:duration-200"
        >
          Privacy Policy
        </a>
        <a 
          href="/terms" 
          className="hover:text-[#2563EB] transition-colors duration-200 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[#2563EB] after:transition-all after:duration-200"
        >
          Terms of Service
        </a>
        <a 
          href="/cookies" 
          className="hover:text-[#2563EB] transition-colors duration-200 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[#2563EB] after:transition-all after:duration-200"
        >
          Cookie Settings
        </a>
      </div>

    </div>
  );
}