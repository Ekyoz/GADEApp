package fr.alexandre.gadeapp.slotAdapteur;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.SeekBar;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import fr.alexandre.gadeapp.R;
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

        return view;
    }
}
