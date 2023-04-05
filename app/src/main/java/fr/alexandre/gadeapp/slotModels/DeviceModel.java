package fr.alexandre.gadeapp.slotModels;

public class DeviceModel {

    private boolean status;
    private String name;
    private int brightness;

    public DeviceModel(boolean status, String name, int brightness){
        this.status = status;
        this.name = name;
        this.brightness = brightness;
    }

    public String getName() {
        return name;
    }

    public boolean getStatus() {
        return status;
    }

    public int getBrightness() {
        return brightness;
    }
}
