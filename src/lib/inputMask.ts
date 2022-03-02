/* eslint-disable no-param-reassign */
import * as React from 'react';

// R$ 10.000,00
export const maskMoney = (event: React.FormEvent<HTMLInputElement>) => {
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');
};

// 000.000.000-00
export const maskCPF = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

// 00.000.000/0000-000
export const maskCNPJ = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 18;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{2})/, '$1-$2');
};

// 000.000.000-00 or 00.000.000/0000-000
export const maskCPFOrCNPJ = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 18;
  const { value } = event.currentTarget;
  if (value.length >= 15) {
    return maskCNPJ(event);
  }
  return maskCPF(event);
};

// (00) 00000-0000
export const maskPhone = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2');
};

// (00) 0000-0000
export const maskLandlineTelephone = (
  event: React.FormEvent<HTMLInputElement>,
) => {
  event.currentTarget.maxLength = 14;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d{4})/, '$1-$2');
};

// 00000-000
export const maskCEP = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 9;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
};

// 00/00/0000
export const maskDate = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 10;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');
};

export const maskOnlyLetters = (event: React.FormEvent<HTMLInputElement>) => {
  const { value } = event.currentTarget;
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
};

export const maskOnlyNumbers = (event: React.FormEvent<HTMLInputElement>) => {
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '');
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

type Masks = Record<
  MaskTypes,
  (event: React.FormEvent<HTMLInputElement>) => string
>;

const masks: Masks = {
  cpf: maskCPF,
  cnpj: maskCNPJ,
  cpf_cnpj: maskCPFOrCNPJ,
  cep: maskCEP,
  date: maskDate,
  phone: maskPhone,
  landlineTelephone: maskLandlineTelephone,
  money: maskMoney,
  onlyLetters: maskOnlyLetters,
  onlyNumbers: maskOnlyNumbers,
};

export default masks;
