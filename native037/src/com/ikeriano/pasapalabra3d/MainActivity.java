package com.ikeriano.pasapalabra3d;
import android.app.Activity;
import android.os.Bundle;
import android.content.res.AssetFileDescriptor;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.net.Uri;
import android.webkit.*;
import java.io.*;
import java.util.*;
/** Activos locales y biblioteca con rangos reales, sin descomprimir vídeos en memoria. */
public class MainActivity extends Activity {
 private WebView web;private PermissionRequest pending;
 private static final String HOST="appassets.pasapalabra.local", AUTH="com.ikeriano.pasapalabra3d.biblioteca037";
 @Override public void onCreate(Bundle state){super.onCreate(state);getWindow().addFlags(128);hide();web=new WebView(this);
  WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setMediaPlaybackRequiresUserGesture(false);s.setAllowFileAccess(false);s.setAllowContentAccess(false);s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  web.addJavascriptInterface(new LibraryBridge(),"Biblioteca037");
  web.addJavascriptInterface(new OficialBridge(),"Oficial38");
  web.setWebChromeClient(new WebChromeClient(){@Override public void onPermissionRequest(final PermissionRequest r){runOnUiThread(()->{if(!("https://"+HOST).equals(r.getOrigin().toString().replaceAll("/$",""))){r.deny();return;}boolean audio=false;for(String a:r.getResources())if(PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(a))audio=true;if(!audio){r.deny();return;}if(android.os.Build.VERSION.SDK_INT<23||checkSelfPermission(android.Manifest.permission.RECORD_AUDIO)==PackageManager.PERMISSION_GRANTED){r.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});}else{pending=r;requestPermissions(new String[]{android.Manifest.permission.RECORD_AUDIO},37);}});}});
  web.setWebViewClient(new WebViewClient(){
   @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){return !HOST.equals(r.getUrl().getHost());}
   @Override public boolean shouldOverrideUrlLoading(WebView v,String u){return !u.startsWith("https://"+HOST+"/");}
   @Override public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){
    if(!HOST.equals(r.getUrl().getHost()))return error(403,"Forbidden");String p=r.getUrl().getPath();if(p==null||p.equals("/"))p="/index.html";
    if(p.contains("..")||p.indexOf('\\')>=0)return error(403,"Forbidden");String mime=mime(p);
    try{
     if(p.endsWith(".mp4")||p.endsWith(".ogg")||p.endsWith(".mp3")||p.endsWith(".opus")||p.endsWith(".m4a")){
      final AssetFileDescriptor fd=p.startsWith("/media037/")?getContentResolver().openAssetFileDescriptor(Uri.parse("content://"+AUTH+"/"+p.substring(10)),"r"):getAssets().openFd("www"+p);
      if(fd==null)return error(404,"Not Found");long length=fd.getLength(),start=0,end=length-1;boolean partial=false;String range=null;
      for(Map.Entry<String,String> h:r.getRequestHeaders().entrySet())if(h.getKey().equalsIgnoreCase("Range"))range=h.getValue();
      if(range!=null&&range.startsWith("bytes=")){String spec=range.substring(6).split(",")[0];int sep=spec.indexOf('-');if(sep>=0){String a=spec.substring(0,sep).trim(),b=spec.substring(sep+1).trim();if(a.length()==0){long suffix=Long.parseLong(b);start=Math.max(0,length-suffix);}else{start=Long.parseLong(a);if(b.length()>0)end=Math.min(length-1,Long.parseLong(b));}partial=true;}}
      if(start<0||start>=length||end<start){fd.close();Map<String,String> h=new HashMap<>();h.put("Content-Range","bytes */"+length);return new WebResourceResponse(mime,null,416,"Range Not Satisfiable",h,new ByteArrayInputStream(new byte[0]));}
      FileInputStream input=new FileInputStream(fd.getFileDescriptor());input.getChannel().position(fd.getStartOffset()+start);long count=end-start+1;Map<String,String> h=new HashMap<>();h.put("Accept-Ranges","bytes");h.put("Content-Length",Long.toString(count));h.put("Cache-Control","no-cache");if(partial)h.put("Content-Range","bytes "+start+"-"+end+"/"+length);
      return new WebResourceResponse(mime,null,partial?206:200,partial?"Partial Content":"OK",h,new Bounded(input,count,fd));
     }
     return new WebResourceResponse(mime,mime.startsWith("text/")||mime.equals("application/javascript")||mime.equals("application/json")?"UTF-8":null,getAssets().open("www"+p));
    }catch(Exception e){return error(404,"Not Found");}
   }
  });setContentView(web);web.loadUrl("https://"+HOST+"/index.html");
 }
 @Override public void onRequestPermissionsResult(int code,String[] p,int[] g){super.onRequestPermissionsResult(code,p,g);if(code==37&&pending!=null){if(g.length>0&&g[0]==PackageManager.PERMISSION_GRANTED)pending.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});else pending.deny();pending=null;}}
 static final class Bounded extends FilterInputStream{private long left;private final AssetFileDescriptor fd;Bounded(InputStream in,long len,AssetFileDescriptor f){super(in);left=len;fd=f;}@Override public int read()throws IOException{if(left<=0)return -1;int v=in.read();if(v>=0)left--;return v;}@Override public int read(byte[] b,int o,int c)throws IOException{if(left<=0)return -1;int n=in.read(b,o,(int)Math.min(left,c));if(n>0)left-=n;return n;}@Override public long skip(long c)throws IOException{long n=in.skip(Math.min(left,c));left-=n;return n;}@Override public int available(){return (int)Math.min(Integer.MAX_VALUE,left);}@Override public void close()throws IOException{try{super.close();}finally{fd.close();}}}
 public final class LibraryBridge {@JavascriptInterface public boolean disponible(){try{getPackageManager().getPackageInfo("com.ikeriano.pasapalabra3d.biblioteca.gb",0);return true;}catch(Exception e){return false;}}}
 public final class OficialBridge {
  private boolean allowed(String pkg){return "com.ikeriano.pasapalabra.v131".equals(pkg)||"com.ikeriano.pasapalabra.l131".equals(pkg)||"com.ikeriano.pasapalabra.v152".equals(pkg)||"com.ikeriano.pasapalabra.l152".equals(pkg);}
  @JavascriptInterface public boolean instalada(String pkg){if(!allowed(pkg))return false;try{getPackageManager().getPackageInfo(pkg,0);return true;}catch(Exception e){return false;}}
  @JavascriptInterface public boolean abrir(final String pkg){if(!allowed(pkg))return false;final Intent i=getPackageManager().getLaunchIntentForPackage(pkg);if(i==null)return false;i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);runOnUiThread(()->{try{startActivity(i);}catch(Exception e){}});return true;}
 }
 private WebResourceResponse error(int c,String r){return new WebResourceResponse("text/plain","UTF-8",c,r,new HashMap<String,String>(),new ByteArrayInputStream(r.getBytes()));}
 private String mime(String p){p=p.toLowerCase(Locale.ROOT);if(p.endsWith(".html"))return "text/html";if(p.endsWith(".js"))return "application/javascript";if(p.endsWith(".css"))return "text/css";if(p.endsWith(".json"))return "application/json";if(p.endsWith(".mp4"))return "video/mp4";if(p.endsWith(".mp3"))return "audio/mpeg";if(p.endsWith(".m4a"))return "audio/mp4";if(p.endsWith(".ogg")||p.endsWith(".opus"))return "audio/ogg";if(p.endsWith(".png"))return "image/png";if(p.endsWith(".jpg"))return "image/jpeg";if(p.endsWith(".webp"))return "image/webp";if(p.endsWith(".svg"))return "image/svg+xml";if(p.endsWith(".ttf"))return "font/ttf";return "application/octet-stream";}
 private void hide(){getWindow().getDecorView().setSystemUiVisibility(5894);}
 @Override public void onWindowFocusChanged(boolean f){super.onWindowFocusChanged(f);if(f)hide();}
 @Override public void onBackPressed(){web.evaluateJavascript("window.PP037&&PP037.back()?true:(window.onBack?(onBack(),true):false)",v->{if(!"true".equals(v))finish();});}
 @Override protected void onPause(){if(web!=null){web.evaluateJavascript("window.PP037&&PP037.pause();document.querySelectorAll('video,audio').forEach(v=>v.pause())",null);web.onPause();}super.onPause();}
 @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();}
 @Override protected void onDestroy(){if(web!=null){web.destroy();web=null;}super.onDestroy();}
}
