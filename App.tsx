import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios, { AxiosResponse } from "axios";
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';

type APIData = {
  code: string;
  name: string;
}

type APIResponseData = {
  results: APIData[]
}

DropDownPicker.setListMode("SCROLLVIEW");

export default function App() {

  const [province, setProvince] = useState<ItemType<string>[]>([]);
  const [provinceValue, setProvinceValue] = useState<string>("")
  const [openProvince, setProvinceOpen] = useState(false);

  const [district, setDistrict] = useState<ItemType<string>[]>([]);
  const [districtValue, setDistrictValue] = useState<string>("")
  const [openDistrict, setDistrictOpen] = useState(false);

  const [commune, setCommune] = useState<ItemType<string>[]>([]);
  const [communeValue, setCommuneValue] = useState<string>("")
  const [openCommune, setCommuneOpen] = useState(false);

  useEffect(() => {
    axios.get<APIResponseData>('https://api.mysupership.vn/v1/partner/areas/province').then((response: AxiosResponse<APIResponseData>) => {
      const tempResult: ItemType<string>[] = response.data.results.map((result: APIData) => {
        return { label: result.name, value: result.code }
      })
      setProvince(tempResult);
    });
  }, []);

  useEffect(() => {
    provinceValue && axios.get<APIResponseData>('https://api.mysupership.vn/v1/partner/areas/district', { params: { province: provinceValue } }).then((response: AxiosResponse<APIResponseData>) => {
      const tempResult: ItemType<string>[] = response.data.results.map((result: APIData) => {
        return { label: result.name, value: result.code }
      })
      setDistrict(tempResult);
    });
  }, [provinceValue]);

  useEffect(() => {
    districtValue && axios.get<APIResponseData>('https://api.mysupership.vn/v1/partner/areas/commune', { params: { district: districtValue } }).then((response: AxiosResponse<APIResponseData>) => {
      const tempResult: ItemType<string>[] = response.data.results.map((result: APIData) => {
        return { label: result.name, value: result.code }
      })
      setCommune(tempResult);
    });
  }, [districtValue]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder="Select province"
        open={openProvince}
        value={provinceValue}
        items={province}
        setOpen={setProvinceOpen}
        setValue={setProvinceValue}
        setItems={setProvince}
      />
      <DropDownPicker
        placeholder="Select district"
        open={openDistrict}
        value={districtValue}
        items={district}
        setOpen={setDistrictOpen}
        setValue={setDistrictValue}
        setItems={setDistrict}
      />
      <DropDownPicker
        placeholder="Select commune"
        open={openCommune}
        value={communeValue}
        items={commune}
        setOpen={setCommuneOpen}
        setValue={setCommuneValue}
        setItems={setCommune}
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
