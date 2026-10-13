import BotonLogin from "@/components/BotonLogin";
import CampoInput from "@/components/CampoInput";
import CuentaPrueba from "@/components/CuentaPrueba";
import HeaderLogin from "@/components/HeaderLogin";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.titulo}>WELCOME SISTEMAS</Text>
      <HeaderLogin></HeaderLogin>
      <CampoInput
        titulo={"Correo Electronico"}
        valorFondo={"nombre@gmail.com"}
      ></CampoInput>
      <CampoInput
        titulo={"Contraseña"}
        valorFondo={"minimo 8 caractes"}
      ></CampoInput>
      <BotonLogin></BotonLogin>
      <CuentaPrueba
        name={"Camila Mendoza"}
        cuenta={"Cuenta candidata"}
      ></CuentaPrueba>
      <CuentaPrueba
        name={"Kantutani Tech"}
        cuenta={"Cuenta candidata"}
      ></CuentaPrueba>
      <CuentaPrueba
        name={"Administracion"}
        cuenta={"Cuenta candidata"}
      ></CuentaPrueba>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "red",
  },
});
