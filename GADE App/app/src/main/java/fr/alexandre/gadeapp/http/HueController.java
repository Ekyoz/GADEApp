package fr.alexandre.gadeapp.http;

import android.annotation.SuppressLint;
import android.os.AsyncTask;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class HueController {
    private static String hueIp;
    private static String hueApiKey;

    public HueController(String ip, String apiKey) {
        hueIp = ip;
        hueApiKey = apiKey;
    }

    public static void setLightState(int lightId, boolean state) {
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                try {
                    OkHttpClient client = new OkHttpClient();
                    String url = "http://" + hueIp + "/api/" + hueApiKey + "/lights/" + lightId + "/state";
                    String json;
                    if (state) {
                        json = "{\"on\":true}";
                    } else {
                        json = "{\"on\":false}";
                    }
                    MediaType mediaType = MediaType.parse("application/json");
                    RequestBody body = RequestBody.create(json, mediaType);
                    Request request = new Request.Builder()
                            .url(url)
                            .put(body)
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }
        }.execute();
    }

    public static void setLightBrightness(int lightId, int percentage) {
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                try {
                    OkHttpClient client = new OkHttpClient();
                    int brightness = (int) Math.round(254.0 * percentage / 100.0);
                    String url = "http://" + hueIp + "/api/" + hueApiKey + "/lights/" + lightId + "/state";
                    String json = "{\"bri\":" + brightness + "}";
                    MediaType mediaType = MediaType.parse("application/json");
                    RequestBody body = RequestBody.create(json, mediaType);
                    Request request = new Request.Builder()
                            .url(url)
                            .put(body)
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }
        }.execute();
    }
}

