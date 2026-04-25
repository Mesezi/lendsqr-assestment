import { getUsersTableData, saveUserToLocalStorage, getUserDetails } from "@/services/users";
import { User } from "@/types";

const mockUser: Partial<User> = {
  id: "test-id-001",
  username: "John Doe",
  email: "john@example.com",
  status: "Active",
  organization: "Org1",
};

const mockUsers = [mockUser, { ...mockUser, id: "test-id-002", username: "Jane Smith" }];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockUsers,
  } as Response);
  localStorage.clear();
});

afterEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

describe("getUsersTableData", () => {
  it("fetches and returns users array", async () => {
    const data = await getUsersTableData();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(2);
  });

  it("returns users with required fields", async () => {
    const data = await getUsersTableData();
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("username");
    expect(data[0]).toHaveProperty("email");
    expect(data[0]).toHaveProperty("status");
  });

  it("does not write to localStorage", async () => {
    await getUsersTableData();
    expect(localStorage.getItem("user_test-id-001")).toBeNull();
  });

  // Negative
  it("throws when API response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false } as Response);
    await expect(getUsersTableData()).rejects.toThrow("Failed to fetch users");
  });
});

describe("saveUserToLocalStorage", () => {
  it("saves user under key user_<id>", () => {
    saveUserToLocalStorage(mockUser as User);
    const stored = localStorage.getItem("user_test-id-001");
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!).username).toBe("John Doe");
  });

  it("overwrites existing entry for same id", () => {
    saveUserToLocalStorage(mockUser as User);
    saveUserToLocalStorage({ ...mockUser, username: "Updated Name" } as User);
    const stored = JSON.parse(localStorage.getItem("user_test-id-001")!);
    expect(stored.username).toBe("Updated Name");
  });
});

describe("getUserDetails", () => {
  beforeEach(() => {
    saveUserToLocalStorage(mockUser as User);
  });

  // Positive
  it("returns the correct user by id", async () => {
    const user = await getUserDetails("test-id-001");
    expect(user.id).toBe("test-id-001");
    expect(user.username).toBe("John Doe");
  });

  // Negative
  it("throws when user id does not exist in localStorage", async () => {
    await expect(getUserDetails("non-existent-id")).rejects.toThrow("No data found");
  });

  it("throws when localStorage is empty", async () => {
    localStorage.clear();
    await expect(getUserDetails("test-id-001")).rejects.toThrow("No data found");
  });
});
