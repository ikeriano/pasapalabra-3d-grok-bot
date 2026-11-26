package com.ikeriano.pasapalabra3d;
import android.content.*;import android.content.res.AssetFileDescriptor;import android.database.Cursor;import android.net.Uri;import java.io.FileNotFoundException;
/** Sólo lectura y protegida por permiso de firma; vídeos ZIP_STORED. */
public class BibliotecaProvider extends ContentProvider {
 @Override public boolean onCreate(){return true;}
 @Override public AssetFileDescriptor openAssetFile(Uri u,String mode)throws FileNotFoundException{String p=u.getLastPathSegment();if(!"r".equals(mode)||p==null||!p.matches("[A-Za-z0-9_-]{11}\\.mp4"))throw new FileNotFoundException();try{return getContext().getAssets().openFd("media037/"+p);}catch(Exception e){throw new FileNotFoundException(p);}}
 @Override public String getType(Uri u){return "video/mp4";}@Override public Cursor query(Uri u,String[] p,String s,String[] a,String o){return null;}@Override public Uri insert(Uri u,ContentValues v){throw new UnsupportedOperationException();}@Override public int update(Uri u,ContentValues v,String s,String[] a){throw new UnsupportedOperationException();}@Override public int delete(Uri u,String s,String[] a){throw new UnsupportedOperationException();}
}
