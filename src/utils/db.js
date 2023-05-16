const login = async (user_id, supabase) => {
  try {
    const { data, error, status } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id)
      .single();

    if (error && status !== 406) {
      console.log("definitely got a 406");
      throw error;
    }

    return data;
  } catch (error) {
    console.log("login error");
    return error.status;
  }
};

const create = async (uid, character, supabase) => {
  const input = {
    id: uid,
    name: character.name,
    class: character.characterClass,
  };
  try {
    const data = await supabase.from("users").insert(input);

    return data;
  } catch (error) {
    return error.status;
  }
};

const obtainTodos = async (uid, supabase) => {
  try {
    const { data: links, error } = await supabase
      .from("users_todos_link")
      .select("*")
      .eq("users_id", uid);

    if (error || !links) return null;

    let ret_tmp = null;

    const all_items = await Promise.all(
      links.map(async (e) => {
        await supabase
          .from("todos")
          .select("*")
          .eq("id", e.todos_id)
          .single()
          .then((todo) => {
            ret_tmp = {
              id: e.id,
              completed: e.completed,
              text: todo.data.text,
              origin: todo.data.origin,
            };
          });

        return ret_tmp;
      })
    );

    return all_items;
  } catch (error) {
    return error;
  }
};

const update = async (id, character, todos, supabase) => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ energy: character.energy })
      .eq("id", id);

    if (error) {
      throw error;
    }

    todos.map(async (e) => {
      const { error } = await supabase
        .from("users_todos_link")
        .update({ completed: e.completed })
        .eq("id", e.id);
      if (error) {
        throw error;
      }
    });
    console.log("updated !");
  } catch (error) {
    return error;
  }
};

const nonTakenTasks = async (uid, supabase) => {
  try {
    const { data: links, error } = await supabase
      .from("users_todos_link")
      .select("*")
      .eq("users_id", uid);

    if (error) return null;
    const { data: all_items } = await supabase
      .from("todos")
      .select("*")
      .eq("origin", "app");

    const filtered = all_items.filter(
      (item) => !links.some((link) => link.todos_id === item.id)
    );

    return filtered;
  } catch (error) {
    return null;
  }
};

const addNewLink = async (user_id, todo_id, supabase) => {
  const { data: inserted, error } = await supabase
    .from("users_todos_link")
    .insert({
      users_id: user_id,
      todos_id: todo_id,
      completed: false,
    })
    .select("*")
    .single();
  if (error) {
    console.log(error);
    return false;
  }
  return inserted;
};

export const db = {
  login,
  create,
  obtainTodos,
  update,
  nonTakenTasks,
  addNewLink,
};
