people([alice, bob, carol]).
fruits([apples, bananas, cherries]).

not_like(alice, apples).
not_like(bob, bananas).

all_different([]).
all_different([H|T]) :-
    \+ member(H, T),
    all_different(T).

solve :-
    fruits(Fruits),
    % Assign fruits to each person
    select(FruitAlice, Fruits, Fruits1),
    \+ not_like(alice, FruitAlice),
    select(FruitBob, Fruits1, Fruits2),
    \+ not_like(bob, FruitBob),
    [FruitCarol] = Fruits2,
    % Ensure all fruits are assigned uniquely
    all_different([FruitAlice, FruitBob, FruitCarol]),
    % Output the solution
    write('Alice likes '), write(FruitAlice), nl,
    write('Bob likes '), write(FruitBob), nl,
    write('Carol likes '), write(FruitCarol), nl.
