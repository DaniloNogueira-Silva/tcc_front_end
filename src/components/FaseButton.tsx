import { motion } from "framer-motion";

interface FaseButtonProps {
  icon: string;
  nome: string;
  onClick: () => void;
}

const FaseButton = ({ icon, nome, onClick }: FaseButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, transition: { duration: 0.15, ease: "easeOut" } }}
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      onClick={onClick}
      className="bg-[#eff0ec3b] p-2 rounded-lg flex flex-col items-center shadow-lg hover:bg-opacity-100 transition-all duration-150"
    >
      {/* Ícone Ajustado */}
      <img src={icon} alt={nome} className="w-36 h-36 object-contain p-0" />

      {/* Texto Ajustado */}
      <span className="text-sm text-white mt-1">{nome}</span>
    </motion.button>
  );
};

export default FaseButton;
