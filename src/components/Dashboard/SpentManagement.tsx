import { Box, Button } from "@mui/material";

type TProps = {
  add: boolean;
  icon: React.ReactNode;
};

const SpentManagement = ({ add, icon }: TProps) => {
  const handleAddSpent = () => {
    //
  };

  const handleRemoveSpent = () => {
    //
  };

  return (
    <Box>
      <Button startIcon={icon}>
        {add ? "Add new expense" : "Remove expense"}
      </Button>
    </Box>
  );
};

export default SpentManagement;
