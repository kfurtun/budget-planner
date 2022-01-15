import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export const ButtonGroupForGraphs = (props) => {
  const showIncomeExpenseGraphs = () => {
    props.setIsShowIncomeExpenseGraphs(!props.isShowIncomeExpenseGraphs);
    props.setIsShowYearlyLineGraph(false);
  };
  const showYearlyLineGraph = () => {
    props.setIsShowYearlyLineGraph(!props.isShowYearlyLineGraph);
    props.setIsShowIncomeExpenseGraphs(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={showYearlyLineGraph}>Yearly Line Graph</Button>
        <Button onClick={showIncomeExpenseGraphs}>Income/Expense Graphs</Button>
      </ButtonGroup>
    </Box>
  );
};
