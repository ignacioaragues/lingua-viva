(()=>{'use strict';
const $=id=>document.getElementById(id);
const URL='https://nzjdlqanbclsfwwstkwi.supabase.co';
const KEY='sb_publishable_be96IsfN-3skQErkZtOtQQ_pK0OT1Y9';
const OWNER='1f7ce59b-bd9e-4a22-89f5-984ed85bbab5';
const originals=Object.assign({},window.TINTIN_PAGE_TEXT||{});
let client=null,user=null,loading=false;
const form=$('auth-login'),status=$('auth-state'),desc=$('auth-explanation'),logout=$('auth-logout');
const ping=()=>window.dispatchEvent(new Event('tintin-transcripts-ready'));
function view(message){
 status.textContent=message||(!user?'Iniciá sesión para ver los textos':user.id===OWNER?'Cuenta conectada':'Cuenta sin acceso');
 form.classList.toggle('hidden',!!user);logout.classList.toggle('hidden',!user);
 desc.textContent=user?.id===OWNER?'El borrador bilingüe se recupera de tu biblioteca privada; tu PDF queda en este dispositivo.':user?'Esta biblioteca está reservada para la cuenta autorizada.':'Iniciá sesión con tu cuenta de Lengua Viva; tu PDF sigue guardado solamente en este navegador.';
}
async function load(){
 window.TINTIN_PAGE_TEXT=Object.assign({},originals);
 if(user?.id!==OWNER){window.TINTIN_EDITORIAL_STATUS='Iniciá sesión con la cuenta autorizada para acceder al texto privado.';view();ping();return}
 view('Cargando páginas…');window.TINTIN_EDITORIAL_STATUS='Cargando edición privada…';ping();
 try{
  const {data,error}=await client.from('lingua_notes').select('lesson_id,body').eq('user_id',OWNER).like('lesson_id','tintin-transcript:%').limit(100);
  if(error)throw error;
  let count=0;
  for(const entry of data||[]){const n=Number(entry.lesson_id.split(':').pop());if(!(n>=1&&n<=65))continue;try{const item=JSON.parse(entry.body);if(Array.isArray(item.segments)){window.TINTIN_PAGE_TEXT[n]=item;count++}}catch(e){}}
  window.TINTIN_EDITORIAL_STATUS='Esta página aún no tiene transcripción cargada.';
  view('Cuenta conectada · '+count+' páginas');ping();
 }catch(e){window.TINTIN_EDITORIAL_STATUS='Error al recuperar el material privado: '+(e.message||String(e));view('Error de sincronización');ping()}
}
async function sync(){
 if(!client||loading)return;loading=true;
 try{const {data,error}=await client.auth.getUser();if(error)throw error;const next=data?.user||null;
  if(next?.id!==user?.id){user=next;await load()}else view();
 }catch(e){user=null;window.TINTIN_PAGE_TEXT=Object.assign({},originals);view('No se pudo verificar la sesión');ping()}
 finally{loading=false}
}
if(window.supabase?.createClient){client=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});client.auth.onAuthStateChange(()=>{setTimeout(sync,0)});sync()}else view('Servicio de cuenta no disponible');
form.addEventListener('submit',async e=>{e.preventDefault();if(!client)return;view('Ingresando…');const {error}=await client.auth.signInWithPassword({email:$('auth-email').value.trim(),password:$('auth-password').value});if(error){view('Error: '+error.message);return}$('auth-password').value='';await sync()});
logout.addEventListener('click',async()=>{if(!client)return;await client.auth.signOut();user=null;window.TINTIN_PAGE_TEXT=Object.assign({},originals);view();ping()});
})();