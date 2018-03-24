import { Container, interfaces } from "inversify";
import TYPES from "./types";
import { Action, Actuator, Engine } from "./models";
import { CardStrategy, WrestlerStrategy } from "./strategies";
import * as Actions from "./resources/actions";
import * as Actuators from "./resources/actuators";
import CoreCardStrategy from "./strategies/core/card.strategy";
import CoreWrestlerStrategy from "./strategies/core/wrestler.strategy";
import CoreEngine from "./engine";

var container = new Container();

/* ENGINE */
container.bind<Engine>(TYPES.Engine).to(CoreEngine);

/* ACTION */
container
  .bind<Action>(TYPES.Action)
  .to(Actions.InitAction)
  .whenTargetNamed("init");

container
  .bind<Action>(TYPES.Action)
  .to(Actions.TurnAction)
  .whenTargetNamed("turn");

container
  .bind<Action>(TYPES.Action)
  .to(Actions.PlayAction)
  .whenTargetNamed("play");

/* STRATEGY */
container.bind<CardStrategy>(TYPES.CardStrategy).to(CoreCardStrategy);
container
  .bind<WrestlerStrategy>(TYPES.WrestlerStrategy)
  .to(CoreWrestlerStrategy);

/* ACTUATOR */
container
  .bind<Actuator>(TYPES.Actuator)
  .to(Actuators.DamageActuator)
  .whenTargetNamed(Actuators.DamageActuator.KEY);

container
  .bind<Actuator>(TYPES.Actuator)
  .to(Actuators.MirrorActuator)
  .whenTargetNamed(Actuators.MirrorActuator.KEY);

container
  .bind<Actuator>(TYPES.Actuator)
  .to(Actuators.PinActuator)
  .whenTargetNamed(Actuators.PinActuator.KEY);

container
  .bind<Actuator>(TYPES.Actuator)
  .to(Actuators.RestActuator)
  .whenTargetNamed(Actuators.RestActuator.KEY);

container
  .bind<Actuator>(TYPES.Actuator)
  .to(Actuators.TimewrapActuator)
  .whenTargetNamed(Actuators.TimewrapActuator.KEY);

container
  .bind<interfaces.Factory<Actuator>>("Factory<Actuator>")
  .toFactory<Actuator>(context => {
    return (named: string) => {
      let actuator = context.container.getNamed<Actuator>(
        TYPES.Actuator,
        named
      );
      return actuator;
    };
  });

export default container;
