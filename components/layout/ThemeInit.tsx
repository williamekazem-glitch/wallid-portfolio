export function ThemeInit() {
  const code = "(function(){try{var s=localStorage.getItem('wallid-theme');if(s==='light'){document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();";
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
