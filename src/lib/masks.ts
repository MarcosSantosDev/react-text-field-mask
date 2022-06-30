/* eslint-disable no-param-reassign */
import * as React from 'react';

// 10.000,00 -> 10000.00
export const removeMoneyMask = (value: string | number) => {
  const originalNumber = Number(value);
  const numberIsWithMask = Number.isNaN(originalNumber);

  if (numberIsWithMask) {
    const stringValue = value.toString();
    const splitedMoneyMask = stringValue
      .split('.')
      .join('')
      .split(',')
      .join('.');

    return splitedMoneyMask.replace(/[^0-9.-]+/g, '');
  }

  return value.toString();
};

type BehaviorMode = 'standard' | 'typing';

const moneyMaskCustomization = {
  /**
   * typingMode - The value is typed from right to left:
   *  - '1' -> '0.01'
   *  - '10' -> '0.10'
   *
   * defaultMode - Simple conversion:
   *  - '1' -> '1.00'
   *  - '10' -> '10.00'
   */
  maskBehaviorMode: (behaviorMode: BehaviorMode, value: string | number) => {
    const numberWithoutMask = removeMoneyMask(value);
    const normalizedMoneyValue = moneyMaskCustomization.normalizeMoneyValue(
      numberWithoutMask.toString(),
    );
    const integerWithoutDecimalPlaces = normalizedMoneyValue.length === 1;

    if (behaviorMode === 'typing' && integerWithoutDecimalPlaces) {
      const newNumberFormat = Number(normalizedMoneyValue) / 100;
      return Number(newNumberFormat).toFixed(2);
    }

    if (behaviorMode === 'standard' && integerWithoutDecimalPlaces) {
      return Number(normalizedMoneyValue).toFixed(2);
    }

    return normalizedMoneyValue;
  },
  normalizeMoneyValue: (numberToNormalized: string) => {
    const [stringInteger, stringDecimal] = numberToNormalized.split('.');

    if (stringDecimal && stringDecimal.length === 1) {
      const lastPositionOfTheInteger = stringInteger.length - 1;
      const lastToIntegerPlace = stringInteger[lastPositionOfTheInteger];

      if (lastPositionOfTheInteger !== 0) {
        const firstIntegerPlace = stringInteger.substring(
          0,
          lastPositionOfTheInteger,
        );

        return `${firstIntegerPlace}.${lastToIntegerPlace}${stringDecimal}`;
      }

      return `${0}.${lastToIntegerPlace}${stringDecimal}`;
    }

    if (stringDecimal && stringDecimal.length === 3) {
      const firstDecimalPlace = stringDecimal.substring(0, 1);
      const lastTwoDecimalPlaces = stringDecimal.substring(1, 3);
      const integerIsZero = Number(stringInteger) === 0;

      if (integerIsZero) {
        return `${firstDecimalPlace}.${lastTwoDecimalPlaces}`;
      }

      return `${stringInteger}${firstDecimalPlace}.${lastTwoDecimalPlaces}`;
    }

    return numberToNormalized;
  },
};

// 10.000,00
const moneyMask = (
  value: string | number,
  maskBehaviorMode: BehaviorMode = 'standard',
) => {
  if (value || Number.isInteger(value)) {
    const moneyValue = moneyMaskCustomization.maskBehaviorMode(
      maskBehaviorMode,
      value,
    );

    return moneyValue
      .replace(/\D/g, '')
      .replace(/\D/g, '.')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.');
  }
  return '';
};

// 000.000.000-00
const cpfMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

// 00.000.000/0000-000
const cnpjMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{2})/, '$1-$2');
};

// 000.000.000-00 or 00.000.000/0000-000
const cpfOrCnpjMask = (value: string | number) => {
  const stringValue = value.toString();
  if (stringValue.length >= 15) {
    return cnpjMask(value);
  }
  return cpfMask(value);
};

// (00) 00000-0000
const phoneMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2');
};

// (00) 0000-0000
const landlineTelephoneMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d{4})/, '$1-$2');
};

// 00000-000
const cepMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
};

// 00/00/0000
const dateMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');
};

const onlyLettersMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
};

const onlyNumbersMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue.replace(/\D/g, '');
};

export type MaskTypes =
  | 'cpf'
  | 'cnpj'
  | 'cpf_cnpj'
  | 'cep'
  | 'date'
  | 'phone'
  | 'landlineTelephone'
  | 'money'
  | 'onlyLetters'
  | 'onlyNumbers';

type Masks = {
  [key in MaskTypes]: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => string;
    /**
     * Customizable mask created with Regex
     * @param value Mask value.
     * @param maskBehaviorMode Mask behavior mode, "standard" | "typing".
     *
     *  example:
     *
     * `maskBehaviorMode` in maskMoney
     *
     *  Mode "standard":
     *  - input: 1 -> output: 1,00
     *
     *  Mode "typing":
     *  - input: 1 -> output: 0,01
     */
    maskRegex: (
      value: string | number,
      maskBehaviorMode?: BehaviorMode,
    ) => string;
  };
};

const masks: Masks = {
  money: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      return moneyMask(event.currentTarget.value);
    },
    maskRegex: moneyMask,
  },
  cpf: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 15;
      return cpfMask(event.currentTarget.value);
    },
    maskRegex: cpfMask,
  },
  cnpj: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 18;
      return cnpjMask(event.currentTarget.value);
    },
    maskRegex: cnpjMask,
  },
  cpf_cnpj: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 18;
      return cpfOrCnpjMask(event.currentTarget.value);
    },
    maskRegex: cpfOrCnpjMask,
  },
  phone: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 15;
      return phoneMask(event.currentTarget.value);
    },
    maskRegex: phoneMask,
  },
  landlineTelephone: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 14;
      return landlineTelephoneMask(event.currentTarget.value);
    },
    maskRegex: landlineTelephoneMask,
  },
  cep: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 9;
      return cepMask(event.currentTarget.value);
    },
    maskRegex: cepMask,
  },
  date: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = 10;
      return dateMask(event.currentTarget.value);
    },
    maskRegex: dateMask,
  },
  onlyLetters: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      return onlyLettersMask(event.currentTarget.value);
    },
    maskRegex: onlyLettersMask,
  },
  onlyNumbers: {
    maskEvent: (event: React.FormEvent<HTMLInputElement>) => {
      return onlyNumbersMask(event.currentTarget.value);
    },
    maskRegex: onlyNumbersMask,
  },
};

export default masks;
