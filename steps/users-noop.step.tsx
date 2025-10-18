import { ApiNode, ApiNodeProps } from "motia/workbench";
import React from "react";

type User = {
  id: string | number;
  name?: string;
  username?: string;
  email?: string;
};

type Props = {
  endpoint?: string;
  fetchUsers?: () => Promise<User[]>;
  title?: string;
};

export const User: React.FC<ApiNodeProps> = ({ data }) => {
    // console.log('User Data Node Rendered with data:', data);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFrom("/get-users");
        if (!cancelled) setUsers(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading user details…</div>;
  if (error) return <div role="alert">Error: {error}</div>;
  if (!users.length) return <div>No users found.</div>;

  return (
    <ApiNode
      data={{
        ...data,
        name: "User Data",
        description: "Fetches users from state.",
      }}
    >
      <section>
        <h2>User Details</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {users.map((u, idx) => (
            <li
              key={u.id != null ? String(u.id) : u.name ? `name:${u.name}` : `idx:${idx}`}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <strong>{u.name ?? u.username ?? "(no name)"}</strong>
              {u.email ? (
                <span style={{ marginLeft: 8, color: "#555" }}>{u.email}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </ApiNode>
  );
};

async function fetchFrom(endpoint: string): Promise<User[]> {
  const res = await fetch(endpoint, {
    headers: { Accept: "application/json" , Authorization: `Bearer token`},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray((data as any)?.data)) return (data as any).data;
  return [];
}

export default User;
