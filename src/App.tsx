import { createServer } from "miragejs";
import { useCallback, useState } from "react";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => ([
      {
        id: 1,
        title: 'Transaction 1',
        amount: 400,
        type: 'deposit',
        category: 'Food',
        createdAt: new Date()
      }
    ])
    )
  }
})

export const App: React.FC = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleOpenNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}