package com.ikeriano.pasapalabra3d;
import android.app.Activity;import android.os.Bundle;import android.view.View;import android.view.WindowManager;import android.webkit.*;
public class MainActivity extends Activity{WebView w;
 @Override protected void onCreate(Bundle b){super.onCreate(b);getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  w=new WebView(this);WebSettings s=w.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setMediaPlaybackRequiresUserGesture(false);s.setAllowFileAccess(true);s.setAllowFileAccessFromFileURLs(true);s.setAllowUniversalAccessFromFileURLs(true);
  w.setFocusable(true);w.setFocusableInTouchMode(true);w.setWebChromeClient(new WebChromeClient());w.setWebViewClient(new WebViewClient());setContentView(w);imm();w.setOnSystemUiVisibilityChangeListener(v->imm());w.requestFocus();w.loadUrl("file:///android_asset/www/index.html");}
 void imm(){w.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY|View.SYSTEM_UI_FLAG_FULLSCREEN|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_LAYOUT_STABLE);}
 @Override public void onWindowFocusChanged(boolean f){super.onWindowFocusChanged(f);if(f)imm();}
 @Override protected void onPause(){super.onPause();w.onPause();w.evaluateJavascript("window.onPauseApp&&onPauseApp()",null);}
 @Override protected void onResume(){super.onResume();w.onResume();}
 @Override public void onBackPressed(){w.evaluateJavascript("(window.onBack&&window.onBack())?1:0",v->{if(!"1".equals(v))finish();});}
}
