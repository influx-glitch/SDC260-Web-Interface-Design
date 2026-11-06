/*
Name: Jessica Hussain
Last Updated: 11/01/2026
Project: Briar & Bone
Assignment: Project: Smart Cart
Purpose: Share product information and starting inventory between pages.
*/

//Store products for Briar & Bone.
const products = [
  {
    id: "armor-silver",
    name: "Armor Silver",
    category: "Paints",
    price: 4.99,
    stock: 10,
    image: "images/Armor-Silver.jpg",
    description: "A silver-toned paint for armor, weapons, and metallic details."
  },
  {
    id: "cryptbone-ivory",
    name: "Cryptbone Ivory",
    category: "Paints",
    price: 4.99,
    stock: 10,
    image: "images/Cryptbone-Ivory.jpg",
    description: "An ivory shade for skeletal characters, aged details, and pale accents."
  },
  {
    id: "briarwood-moss",
    name: "Briarwood Moss",
    category: "Paints",
    price: 4.99,
    stock: 10,
    image: "images/Briarwood-Moss.jpg",
    description: "A woodland green for forest-inspired palettes and earthy details."
  },
  {
    id: "crimson-dragon",
    name: "Crimson Dragon — Finished",
    category: "Finished Figures",
    price: 59.99,
    stock: 10,
    image: "images/Finished-Crimson-Dragon.jpg",
    description: "A finished crimson dragon to inspire a dramatic fantasy encounter."
  },
  {
    id: "toadstool-goblin",
    name: "Toadstool Goblin Forager — Finished",
    category: "Finished Figures",
    price: 18.99,
    stock: 10,
    image: "images/Finished-Toadstool-Goblin-Forager.jpg",
    description: "A finished goblin forager bringing woodland whimsy to your collection."
  },
  {
    id: "cryptbound-sentinel",
    name: "Cryptbound Skeleton Sentinel — Finished",
    category: "Finished Figures",
    price: 18.99,
    stock: 10,
    image: "images/Finished-Cryptbound-Skeleton-Sentinel.jpg",
    description: "A finished skeletal guardian for forgotten crypts and haunted adventures."
  },
  {
    id: "briarwood-witch",
    name: "Briarwood Witch",
    category: "Unfinished Figures",
    price: 6.99,
    stock: 10,
    image: "images/Briarwood-Witch.jpg",
    description: "An unfinished woodland witch waiting for your own enchanted color palette."
  },
  {
    id: "moonveil-ranger",
    name: "Moonveil Elven Ranger",
    category: "Unfinished Figures",
    price: 6.99,
    stock: 10,
    image: "images/Moonveil-Elven-Ranger.jpg",
    description: "An unfinished elven ranger ready for forest colors or a moonlit palette."
  },
  {
    id: "emberfang-warrior",
    name: "Emberfang Dragonborn Warrior",
    category: "Unfinished Figures",
    price: 6.99,
    stock: 10,
    image: "images/Emberfang-Dragonborn-Warrior.jpg",
    description: "An unfinished dragonborn warrior for bold colors and dramatic contrasts."
  },
  {
    id: "basecoat-brush",
    name: "Basecoat Brush",
    category: "Brushes",
    price: 6.99,
    stock: 10,
    image: "images/Basecoat-Brush.jpg",
    description: "Begin your painting project with a brush for applying base colors."
  },
  {
    id: "detail-brush",
    name: "Detail Brush",
    category: "Brushes",
    price: 5.99,
    stock: 10,
    image: "images/Detail-Brush.jpg",
    description: "Add the small finishing touches that give your miniature personality."
  },
  {
    id: "dust-drybrush",
    name: "Dust Drybrush",
    category: "Brushes",
    price: 8.99,
    stock: 10,
    image: "images/Dust-Drybrush.jpg",
    description: "Explore textured highlights and weathered effects with a drybrush."
  },
  {
    id: "briarwood-witch-kit",
    name: "Briarwood Witch Paint Kit",
    category: "Paint Kits",
    price: 29.99,
    stock: 10,
    image: "images/Briarwood-Witch-Paint-Kit.jpg",
    description: "A woodland-witch painting project with a figure, a scenic accessory, six paints, a basecoat brush, and a detail brush."
  },
  {
    id: "cryptkeeper-kit",
    name: "Cryptkeeper Paint Kit",
    category: "Paint Kits",
    price: 24.99,
    stock: 10,
    image: "images/Cryptkeeper-Paint-Kit.jpg",
    description: "A crypt-inspired painting project with a figure, a scenic accessory, six paints, a basecoat brush, and a detail brush."
  },
  {
    id: "dragon-hoard-kit",
    name: "Dragon Hoard Paint Kit",
    category: "Paint Kits",
    price: 29.99,
    stock: 10,
    image: "images/Dragon-Hoard-Paint-Kit.jpg",
    description: "A dragon-inspired painting project with a figure, a scenic accessory, six paints, a basecoat brush, and a detail brush."
  },
  {
    id: "forest-shrine",
    name: "Forest Shrine",
    category: "Scenic Accessories",
    price: 9.99,
    stock: 10,
    image: "images/Forest-Shrine.jpg",
    description: "Give your woodland setting a mysterious place for offerings and discoveries."
  },
  {
    id: "graveyard-set",
    name: "Graveyard Set",
    category: "Scenic Accessories",
    price: 9.99,
    stock: 10,
    image: "images/Graveyard-Set.jpg",
    description: "Set the scene for haunted encounters and midnight investigations."
  },
  {
    id: "tavern-furnishings",
    name: "Tavern Furnishings",
    category: "Scenic Accessories",
    price: 9.99,
    stock: 10,
    image: "images/Tavern-Furnishings.jpg",
    description: "Create a gathering place for rumors, new companions, and unexpected quests."
  }
];

// Stores inventory remaining after completed demo orders.
const INVENTORY_STORAGE_KEY = "briarAndBoneInventory";

// Loads saved inventory, keeping starting stock when no record exists.
function loadSavedInventory() {
    try {
        const savedInventory = localStorage.getItem(
            INVENTORY_STORAGE_KEY
        );

        if (savedInventory === null) {
            return;
        }

        const inventory = JSON.parse(savedInventory);

        if (
            inventory === null ||
            typeof inventory !== "object" ||
            Array.isArray(inventory)
        ) {
            return;
        }

        products.forEach(function (product) {
            if (
                !Object.prototype.hasOwnProperty.call(
                    inventory,
                    product.id
                )
            ) {
                return;
            }

            const savedStock = inventory[product.id];

            // Accept only whole quantities within starting inventory.
            if (
                Number.isSafeInteger(savedStock) &&
                savedStock >= 0 &&
                savedStock <= product.stock
            ) {
                product.stock = savedStock;
            }
        });
    } catch (error) {
        console.error("Could not load saved inventory:", error);
    }
}

// Saves inventory remaining after a completed demo order.
// Returns false if browser storage could not be updated.
function saveInventory(inventory) {
    try {
        localStorage.setItem(
            INVENTORY_STORAGE_KEY,
            JSON.stringify(inventory)
        );

        return true;
    } catch (error) {
        console.error("Could not save inventory:", error);
        return false;
    }
}

// Apply saved inventory before Shop or Bag uses the products.
loadSavedInventory();
