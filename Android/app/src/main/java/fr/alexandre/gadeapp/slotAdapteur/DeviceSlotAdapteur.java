package fr.alexandre.gadeapp.slotAdapteur;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CompoundButton;
import android.widget.SeekBar;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.util.List;

import fr.alexandre.gadeapp.R;
import fr.alexandre.gadeapp.http.HueController;
import fr.alexandre.gadeapp.slotModels.DeviceModel;

public class DeviceSlotAdapteur extends BaseAdapter {

    private Context context;
    List<DeviceModel> deviceModelList;
    private LayoutInflater inflater;

    public DeviceSlotAdapteur(Context context, List<DeviceModel> deviceModelList){
        this.context = context;
        this.deviceModelList = deviceModelList;
        this.inflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount() {
        return deviceModelList.size();
    }

    @Override
    public DeviceModel getItem(int position) {
        return deviceModelList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup parent) {

        view = inflater.inflate(R.layout.item_devices_adapteur, null);
        HueController hueController = new HueController("192.168.1.65", "fSADIOQ5Weg-0dJhlnmv3VlyEzCYWCRDBFC23SvT");

        DeviceModel currentDevice = getItem(i);

        String deviceName = currentDevice.getName();
        boolean statusSwitch = currentDevice.getStatus();
        int brightness = currentDevice.getBrightness();

        TextView deviceNameView = view.findViewById(R.id.device_name);
        Switch statusSwitchView = view.findViewById(R.id.state_device);
        SeekBar brightnessSeekBar = view.findViewById(R.id.brightness);

        deviceNameView.setText(deviceName);
        statusSwitchView.setChecked(statusSwitch);
        brightnessSeekBar.setProgress(brightness);

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast toast = Toast.makeText(context, "test" + i, Toast.LENGTH_SHORT);
                toast.show();
            }
        });

        statusSwitchView.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                HueController.setLightState(i+1, statusSwitchView.isChecked());
            }
        });

        brightnessSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int brightness, boolean b) {
                HueController.setLightBrightness(i+1, brightness);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        return view;
    }
}
