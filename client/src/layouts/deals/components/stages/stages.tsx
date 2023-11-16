import { useState } from "react";
import { Grid } from "@mui/material";
import { Paper, styled } from "@mui/material";
// components
import Title from "./components/title";
import Objects from "./components/objects";
import DividerStyled from "../../../../components/common/divider/divider-styled";
import { useSelector } from "react-redux";
import { getObjectsLoadingStatus } from "../../../../store/object/objects.store";
import Loader from "../../../../components/common/loader/loader";

const DealContainer = styled(Paper)`
  display: flex;
  height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  color: black;
  background: inherit;
  border: 2px dashed gray;
  padding: 10px;
`;

const Stages = ({ objects, stages, isCurator }) => {
  const [draggableStageId, setDraggableStageId] = useState(null);
  const isLoading = useSelector(getObjectsLoadingStatus())

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    setDraggableStageId(stageId);
  };

  return (
    <Grid container spacing={1}>
      {stages?.map((stage) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={stage._id}>
          <DealContainer
            onDragOver={(e) => handleDragOver(e, stage._id)}
            sx={{
              border:
                draggableStageId === stage?._id ? `1px dashed yellow` : null,
            }}
          >
            <Title item={stage} objects={objects} />
            <DividerStyled
              margin="10px 0 20px 0"
              color={draggableStageId === stage?._id ? "yellow" : "inherit"}
            />
            {!isLoading ? <Objects
              stage={stage}
              objects={objects}
              draggableStageId={draggableStageId}
              setDraggableStageId={setDraggableStageId}
              isCurator={isCurator}
            /> : <Loader/>}
          </DealContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stages;
