export const errorTypes = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'customError'
];

export const messages = {
  nome: {
    valueMissing: 'O campo de nome não pode estar vazio',
    patternMismatch: 'Por favor, preencha um nome válido',
    tooShort: 'Por favor, preencha um nome válido',
  },

  email: {
    valueMissing: 'O campo de email não pode estar vazio',
    patternMismatch: 'Por favor, preencha um email válido',
    tooShort: 'Por favor, preencha um email válido',
  },
  
  cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio',
    patternMismatch: 'Por favor, preencha um CPF válido',
    tooShort: 'O campo CPF não tem caracteres suficientes',
  },

  rg: {
    valueMissing: 'O campo de RG não pode estar vazio',
    patternMismatch: 'Por favor, preencha um RG válido',
    tooShort: 'O campo RG não tem caracteres suficientes',
    customError: 'O CPF digitado não existe',
  },

  aniversario: {
    valueMissing: 'Você precisa preencher sua data de nascimento',
    customError: 'Você deve ser maior que 18 anos para se cadastrar',
  },
  
  termos: {
    valueMissing: 'Você deve aceitar nossos termos antes de continuar'
  }
};