import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { mask } from 'react-native-mask-text';
import { scale, verticalScale } from 'react-native-size-matters';
import { ModalUpdateCarProps } from '..';
import { CarProps } from '../../../screens/MyCars';
import { colorPalette } from '../../../utils/colorPalette';
import { ButtonDefault } from '../../ButtonDefault';
import { InputMaskedWithLabel } from '../../InputMaskedWithLabel';
import { InputWithLabel } from '../../InputWithLabel';
import { TextGeneral } from '../../TextGeneral';
import { schemaUpdateCar } from './schemaUpdateCar';

export function FormUpdateCar({
  id,
  title,
  brand,
  price,
  age,
  isModalVisible,
  setIsModalVisible,
  setIsLoading,
  onSubmit,
}: ModalUpdateCarProps) {
  const [onUpdate, setOnUpdate] = useState(false);

  async function updateCar({ id, title, brand, price, age }: CarProps) {
    setIsLoading(true);
    try {
      const dataToUpdate = {
        title: title.toString(),
        brand: brand.toString(),
        price: price.toString().trim(),
        age: Number(age),
      };
      await axios.put(
        `http://api-test.bhut.com.br:3000/api/cars/${id}`,
        dataToUpdate,
      );
      setIsLoading(false);
      setOnUpdate(true);
      onSubmit();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { id, title, brand, price, age },
      onSubmit: (values: CarProps) => updateCar(values),
      validationSchema: schemaUpdateCar,
    });

  return (
    <>
      {onUpdate ? (
        <>
          <TextGeneral
            fontSize={`${scale(18)}px`}
            borderBottomWidth={`${scale(1)}px`}
            borderColor={colorPalette.darkRed}
            marginBottom={`${verticalScale(10)}px`}
          >
            Carro Atualizado!
          </TextGeneral>
          <TextGeneral
            fontSize={`${scale(12)}px`}
            marginBottom={`${verticalScale(15)}px`}
          >
            O Carro foi atualizado com Sucesso.
          </TextGeneral>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <TextGeneral
              fontSize={`${scale(16)}px`}
              fontColor={colorPalette.paleRed}
              fontWeight="bold"
              borderBottomWidth={`${scale(1)}px`}
              borderColor={colorPalette.paleRed}
            >
              Fechar
            </TextGeneral>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextGeneral
            fontSize={`${scale(16)}px`}
            borderBottomWidth={`${scale(1)}px`}
            borderColor={colorPalette.darkRed}
            marginBottom={`${verticalScale(25)}px`}
          >
            Dê uma diferenciada!
          </TextGeneral>

          <InputWithLabel
            name="title"
            label="Modelo do Carro*"
            error={errors.title}
            value={values.title}
            defaultValue={values.title}
            placeholder="Carro Teste"
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            inputToUpdate
          />

          <InputWithLabel
            name="brand"
            label="Marca*"
            error={errors.brand}
            value={values.brand}
            defaultValue={values.brand}
            placeholder="Ferrari"
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            inputToUpdate
          />

          <InputWithLabel
            name="age"
            label="Ano*"
            error={errors.age}
            value={values.age}
            defaultValue={values.age}
            placeholder="2022"
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            inputToUpdate
          />

          <InputMaskedWithLabel
            name="price"
            label="Preço*"
            error={errors.price}
            defaultValue={values.price}
            placeholder="50.000,00"
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            typeMask="currency"
            optionsMask={{
              prefix: 'R$ ',
              decimalSeparator: ',',
              groupSeparator: '.',
              precision: 2,
            }}
            hasMask
            isNumber
            inputToUpdate
          />

          <ButtonDefault
            onButtonPress={() => handleSubmit()}
            textInButton="ATUALIZAR"
          />

          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <TextGeneral
              fontSize={`${scale(14)}px`}
              fontColor={colorPalette.paleRed}
              fontWeight="bold"
              borderBottomWidth={`${scale(1)}px`}
              borderColor={colorPalette.paleRed}
              marginTop={`${verticalScale(10)}px`}
            >
              Cancelar
            </TextGeneral>
          </TouchableOpacity>
        </>
      )}
    </>
  );
}
