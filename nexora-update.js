(function(){
  if(!('serviceWorker' in navigator)) return;

  let refreshing=false;

  navigator.serviceWorker.addEventListener('controllerchange',function(){
    if(refreshing) return;
    refreshing=true;
    window.location.reload();
  });

  window.addEventListener('load',async function(){
    try{
      const reg=await navigator.serviceWorker.getRegistration();
      if(!reg) return;

      await reg.update();

      if(reg.waiting){
        const ok=window.confirm(
          'NEXORA ka naya update available hai.\n\nUpdate karke latest version use karein?'
        );
        if(ok){
          reg.waiting.postMessage({type:'SKIP_WAITING'});
        }
      }
    }catch(e){}
  });
})();