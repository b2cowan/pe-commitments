import React from "react";
import { useFormContext, Controller, ErrorMessage } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

import "./GameDetailsInput.css";

const GameDetailsInput = (props) => {
  return (
    <div className="game-details">
      <div className={`game-details-input game-details-date`}>
        <Controller
          as={
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          }
          name="onDate"
          rules={{
            required: "A valid date is required.",
          }}
          defaultValue=""
        />
      </div>
      <div className={`game-details-input game-details-text`}>
        <Controller
          as={<TextField label="Game Number" type="number" />}
          name="gameNum"
          rules={{
            required: "Game number is required.",
          }}
          defaultValue=""
        />
      </div>
      <div className={`game-details-input game-details-text`}>
        <Controller
          as={<TextField label="Season" type="number" />}
          name="season"
          rules={{
            required: "Season is required.",
          }}
          defaultValue=""
        />
      </div>
      <div className={`game-details-input game-details-text`}>
        <Controller
          as={<TextField label="Lane Number" type="number" />}
          name="laneNum"
          defaultValue=""
        />
      </div>
    </div>
  );
};

export default GameDetailsInput;
