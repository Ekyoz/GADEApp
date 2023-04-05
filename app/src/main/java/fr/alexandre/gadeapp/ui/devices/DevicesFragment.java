package fr.alexandre.gadeapp.ui.devices;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import java.util.ArrayList;
import java.util.List;

import fr.alexandre.gadeapp.R;
import fr.alexandre.gadeapp.databinding.FragmentDevicesBinding;
import fr.alexandre.gadeapp.slotAdapteur.DeviceSlotAdapteur;
import fr.alexandre.gadeapp.slotModels.DeviceModel;

public class DevicesFragment extends Fragment {

    private FragmentDevicesBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        DeveicesViewModel homeViewModel =
                new ViewModelProvider(this).get(DeveicesViewModel.class);

        binding = FragmentDevicesBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        List<DeviceModel> deviceModelList = new ArrayList<>();
        deviceModelList.add(new DeviceModel(true, "Lampe couloir", 30));
        deviceModelList.add(new DeviceModel(false, "Salle 435", 10));
        deviceModelList.add(new DeviceModel(true, "Salle 436", 60));
        ListView deviceList = root.findViewById(R.id.device_list);
        deviceList.setAdapter(new DeviceSlotAdapteur(root.getContext(), deviceModelList));



        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}