const active = engine.getActive(mutable);
const target = engine.getFirstTarget(mutable);

const tmp = active.hand;
active.hand = target.hand;
target.hand = tmp;
