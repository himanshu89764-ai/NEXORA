/*
 * Copyright 2020 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.nexora.app;

import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;




import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Build;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class LauncherActivity
        extends com.google.androidbrowserhelper.trusted.LauncherActivity {
    

    

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        nexoraCheckForUpdate();

        super.onCreate(savedInstanceState);
        // Setting an orientation crashes the app due to the transparent background on Android 8.0
        // Oreo and below. We only set the orientation on Oreo and above. This only affects the
        // splash screen and Chrome will still respect the orientation.
        // See https://github.com/GoogleChromeLabs/bubblewrap/issues/496 for details.
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }
    }

    @Override
    protected Uri getLaunchingUrl() {
        // Get the original launch Url.
        Uri uri = super.getLaunchingUrl();

        

        return uri;
    }

    // NEXORA_TWA_IN_APP_UPDATE_FINAL
    private void nexoraCheckForUpdate() {
        new Thread(() -> {
            try {
                URL url = new URL("https://nexora-o8wi.onrender.com/nexora-app-version.json");
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setConnectTimeout(5000);
                con.setReadTimeout(5000);
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
                StringBuilder json = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) json.append(line);
                br.close();

                java.util.regex.Matcher m = java.util.regex.Pattern
                    .compile("\"versionCode\"\\s*:\\s*(\\d+)")
                    .matcher(json.toString());

                if (!m.find()) return;

                int remoteVersion = Integer.parseInt(m.group(1));
                if (remoteVersion <= BuildConfig.VERSION_CODE) return;

                runOnUiThread(() -> new AlertDialog.Builder(LauncherActivity.this)
                    .setTitle("NEXORA Update Available")
                    .setMessage("A new version of NEXORA is available.")
                    .setCancelable(false)
                    .setNegativeButton("Later", null)
                    .setPositiveButton("Update Now", (dialog, which) -> {
                        try {
                            Intent intent = new Intent(Intent.ACTION_VIEW);
                            intent.setDataAndType(
                                Uri.parse("https://nexora-o8wi.onrender.com/nexora-android.apk"),
                                "application/vnd.android.package-archive"
                            );
                            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            startActivity(intent);
                        } catch (Exception e) {
                            startActivity(new Intent(
                                Intent.ACTION_VIEW,
                                Uri.parse("https://nexora-o8wi.onrender.com/nexora-android.apk")
                            ));
                        }
                    }).show());
            } catch (Exception ignored) {}
        }).start();
    }

}
