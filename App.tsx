import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';

type ProvinceData = ValueType & {
  code: string;
  name: string;

}

type DistrictData = ValueType & {
  code: string;
  name: string;
  province: string;
}

type CommuneData = ValueType & {
  code: string;
  name: string;
  district: string;
  province: string;
}

DropDownPicker.setListMode("SCROLLVIEW");

export default function App() {

  const [province, setProvince] = useState<ItemType<ProvinceData>[]>([]);
  const [district, setDistrict] = useState<ItemType<DistrictData>[]>([]);
  const [commune, setCommune] = useState<ItemType<CommuneData>[]>([]);

  //Custom Dropdown Picker for province
  const [provinceValue, setProvinceValue] = useState<ProvinceData>({} as ProvinceData);
  const [provinceOpen, setProvinceOpen] = useState(false);
  const onCountryOpen = useCallback(() => {
    setDistrictOpen(false);
    setCommuneOpen(false);
  }, []);

  //Custom Dropdown Picker for district
  const [districtValue, setDistrictValue] = useState<DistrictData>({} as DistrictData);
  const [districtOpen, setDistrictOpen] = useState(false);
  const onDistrictOpen = useCallback(() => {
    setProvinceOpen(false);
    setCommuneOpen(false);
  }, []);

  //Custom Dropdown Picker for commune
  const [communeValue, setCommuneValue] = useState<CommuneData>({} as CommuneData);
  const [communeOpen, setCommuneOpen] = useState(false);
  const onCommuneOpen = useCallback(() => {
    setProvinceOpen(false);
    setDistrictOpen(false);
  }, []);

  useEffect(() => {
    axios.get('https://api.mysupership.vn/v1/partner/areas/province').then((response) => {
      setProvince(response.data.results);
    });
  }, []);

  useEffect(() => {
    if (provinceValue.code) {
      axios.get('https://api.mysupership.vn/v1/partner/areas/district?', {
        params: {
          province: province.find((item) => item.value?.code)
        }
      }).then((response) => {
        setDistrict(response.data.results);
      });
      console.log(province.find((item) => item.value?.code));
      
    }
    console.log(provinceValue.toString());
    
  }, [provinceValue]);

  useEffect(() => {
    if (districtValue.code) {
      axios.get('https://api.mysupership.vn/v1/partner/areas/commune?', {
        params: {
          district: districtValue.code 
        }
      }).then((response) => {
        setCommune(response.data.results);
      });
    }
  }, [districtValue]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder="Select province"
        schema={{
          label: 'name',
          value: 'name'
        }}
        open={provinceOpen}
        onOpen={onCountryOpen}
        value={provinceValue}
        items={province}
        setOpen={setProvinceOpen}
        setValue={setProvinceValue}
        onChangeValue={(item) => {
          console.log(item);
          
        }}
      />
      <DropDownPicker
        placeholder="Select district"
        schema={{
          label: 'name',
          value: 'name'
        }}
        open={districtOpen}
        onOpen={onDistrictOpen}
        value={districtValue}
        items={district}
        setOpen={setDistrictOpen}
        setValue={setDistrictValue}
      />
      <DropDownPicker
        placeholder="Select commune"
        schema={{
          label: 'name',
          value: 'name'
        }}
        open={communeOpen}
        onOpen={onCommuneOpen}
        value={communeValue}
        items={commune}
        setOpen={setCommuneOpen}
        setValue={setCommuneValue}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
