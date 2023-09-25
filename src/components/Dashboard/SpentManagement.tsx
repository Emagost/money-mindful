import { Box, Button } from "@mui/material";
import { useAuth } from "../../hooks/AuthProvider";

type TProps = {
  add: boolean;
  icon: React.ReactNode;
  onModalOpen?: () => void;
};

const SpentManagement = ({ add, icon, onModalOpen }: TProps) => {
  // const handleRemoveSpent = () => {
  //   //
  // };

  return (
    <Box>
      <Button
        startIcon={icon}
        onClick={onModalOpen}
        // onClick={add ? handleAddSpent : handleRemoveSpent}
      >
        {add ? "Add new expense" : "Remove expense"}
      </Button>
    </Box>
  );
};

export default SpentManagement;
