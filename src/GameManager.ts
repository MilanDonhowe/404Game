/*
File: GameManager.ts
Author: Milan
Date: 8/21/2020
Desc: Singleton responsible for keeping track of game state
      and progress (e.g. interfacing with local storage, 
      tracking win/loss conditions, etc.)
*/
import {CanvasManager} from "./CanvasManager.ts";
import {Level} from "./level_parser.ts";
import {EntityResponse, ResponseType, RequestType} from "./entities/entity.ts";
import {TransitionIn, TransitionOut, TransitionOutLevelRestart, TransitionInLevelRestart} from "./entities/transitions.ts";
import level_1 from "./levels/level_1.json";
import level_2 from "./levels/level_2.json";


export enum GameState {
      LEVEL_LOSS,
      LEVEL_LOSS_TRANSITON,
      LEVEL_WIN,
      LEVEL_ONGOING,
      GAME_WIN,
      LEVEL_TRANSITION_START,
      LEVEL_TRANSITION_LOAD,
      LEVEL_TRANSITION_END,
      TRANSITION_WAIT
};


export class GameManager{

      static STATE : GameState = GameState.LEVEL_ONGOING;

      private current_level : number;
      private level_arr : Level[];

      constructor(){
            this.current_level = 0;
            this.level_arr = [level_1, level_2];
      }

      get_level(): Level{
            return this.level_arr[this.current_level];
      }

      get_next_level(): Level {
            if (this.current_level < this.level_arr.length){
                  this.current_level++;
            }
            return this.get_level();
      }

      load_next_level(): void {
            CanvasManager.entity_pool = [];
            CanvasManager.load_entity_grid(this.get_next_level());
            //CanvasManager.entity_pool.push(new TRANSITION_END());
      }

      step(): void {
            
            switch(GameManager.STATE){
                  case GameState.LEVEL_ONGOING:
                        for (let i=0; i < CanvasManager.entity_pool.length; i++){
                              let e_score : EntityResponse = CanvasManager.entity_pool[i].ask({type:RequestType.Points});
                              if (e_score.success_value == 404){
                                    // ADD TRANSITION START ELEMENT TO THE ENTITY POOL
                                    CanvasManager.entity_pool.push(new TransitionIn(CanvasManager.context.canvas.width, GameState.LEVEL_TRANSITION_LOAD, "#000000"));
                                    CanvasManager.step_entities = false;
                                    GameManager.STATE = GameState.LEVEL_TRANSITION_START;
                                    break;
                              }
                        }
                        break;


                  case GameState.LEVEL_TRANSITION_LOAD:
                        this.load_next_level();
                        CanvasManager.entity_pool.push(new TransitionOut(CanvasManager.context.canvas.width, GameState.LEVEL_TRANSITION_END, "#000000"));
                        GameManager.STATE = GameState.TRANSITION_WAIT;
                        break;


                  case GameState.LEVEL_TRANSITION_END:
                        GameManager.STATE = GameState.LEVEL_ONGOING;
                        CanvasManager.step_entities = true;
                        CanvasManager.delAt(CanvasManager.entity_pool.length-1);
                        break;


                  case GameState.LEVEL_LOSS:
                        CanvasManager.step_entities = false;
                        CanvasManager.entity_pool.push(new TransitionOutLevelRestart(CanvasManager.context.canvas.width, GameState.LEVEL_LOSS_TRANSITON, "#fc4225"));
                        GameManager.STATE = GameState.TRANSITION_WAIT;
                        break;


                  case GameState.LEVEL_LOSS_TRANSITON:
                        CanvasManager.entity_pool = [];
                        CanvasManager.load_entity_grid(this.get_level());
                        CanvasManager.entity_pool.push(new TransitionInLevelRestart(CanvasManager.context.canvas.width, GameState.LEVEL_TRANSITION_END, "#fc4225"));
                        GameManager.STATE = GameState.TRANSITION_WAIT;
                        break;
                  

            }

      }

};