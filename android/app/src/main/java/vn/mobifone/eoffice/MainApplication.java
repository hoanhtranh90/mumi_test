package vn.mobifone.eoffice;

import android.app.Application;


import com.facebook.react.ReactApplication;
import com.swmansion.reanimated.ReanimatedPackage;
import com.microsoft.codepush.react.CodePush;
import com.reactnativevietnam.RNNetworkStatePackage;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import org.wonday.orientation.OrientationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import java.security.Security;
import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile(){
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReanimatedPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new CodePush(getResources().getString(R.string.CodePushDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new RNNetworkStatePackage(),
            new RNFileViewerPackage(),
            new RNImgToBase64Package(),
            new SketchCanvasPackage(),
            new OrientationPackage(),
            new RNDeviceInfo(),
            new ImagePickerPackage(),
            new AsyncStoragePackage(),
            new RNFetchBlobPackage(),
            new ReactNativeDocumentPicker(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    Security.insertProviderAt(new org.conscrypt.OpenSSLProvider(), 1);

  }
}
