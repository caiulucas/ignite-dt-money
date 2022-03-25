import { FormEvent, useCallback, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({isOpen, onRequestClose}) => {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const { createTransaction } = useTransactions()

  const handleCreateNewTransaction = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      
      await createTransaction({ title, amount, type, category })

      setTitle('');
      setAmount(0);
      setCategory('');
      setType('deposit');

      onRequestClose();
  }, [createTransaction, title, amount, type, category, onRequestClose]);

  return (
      <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >        
        <button 
          type="button" 
          onClick={onRequestClose} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal"/>
        </button>

        <Container>
          <h2>Cadastrar transação</h2>

          <input 
            placeholder="Título" 
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />

          <input 
            type="number" 
            placeholder="valor" 
            value={amount}
            onChange={({target}) => setAmount(Number(target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox 
              type="button" 
              onClick={()=> setType('deposit')}
              isActive={type === 'deposit'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada"/>
              <span>Entrada</span>
            </RadioBox>

            <RadioBox 
              type="button"
              onClick={()=> setType('withdraw')}
              isActive={type === 'withdraw'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída"/>
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input 
            placeholder="Categoria"
            value={category}
            onChange={({target}) => setCategory(target.value)}
          />

          <button type="submit" onClick={handleCreateNewTransaction}>
            Cadastrar
          </button>

        </Container>
      </Modal>
  )
}