import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';

type ProvinceData = {
  code: string;
  name: string;
}

type DistrictData = {
  code: string;
  name: string;
  province: string;
}

type CommuneData = {
  code: string;
  name: string;
  district: string;
  province: string;
}

DropDownPicker.setListMode("SCROLLVIEW");

export default function App() {

  const [province, setprovince] = useState([]);
  const [district, setdistrict] = useState([]);
  const [commune, setcommune] = useState([]);

  useEffect(() => {
    axios.get('https://api.mysupership.vn/v1/partner/areas/province').then((response) => {
      setprovince(response.data.results);
      console.log(response.data.results);
    });
  }, []);

  useEffect(() => {
    // if () {

    // }
    axios.get('https://api.mysupership.vn/v1/partner/areas/district?', {
      params: {
        province: '87' //.../district?province=87
      }
    }).then((response) => {
      setdistrict(response.data.results);
      console.log(response.data.results);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder="Select province"
        schema={{
          label: 'name',
          value: 'name'
        }}
        open={open}
        value={value}
        items={province}
        setOpen={setOpen}
        setValue={setValue}
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
