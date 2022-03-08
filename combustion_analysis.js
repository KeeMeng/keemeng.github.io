var letters = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg"];
var names = ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", "Cesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Lutetium", "Hafnium", "Tantalum", "Wolfram", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium"];
var mass = [1.0, 4.0, 6.9, 9.0, 10.8, 12.0, 14.0, 16.0, 19.0, 20.2, 23.0, 24.3, 27.0, 28.1, 31.0, 32.1, 35.5, 39.9, 39.1, 40, 45.0, 47.9, 50.9, 52.0, 54.9, 55.8, 58.9, 58.7, 63.5, 65.4, 69.7, 72.6, 74.9, 79.0, 79.9, 83.8, 85.5, 87.6, 88.9, 91.2, 92.9, 95.9, 98, 101.1, 102.9, 106.4, 107.9, 112.4, 114.8, 118.7, 121.8, 127.6, 126.9, 131.3, 132.9, 137.3, 138.9, 140, 141, 144, 147, 150, 152, 157, 159, 163, 165, 167, 169, 173, 175, 178.5, 180.9, 183.8, 186.2, 190.2, 192.2, 195.1, 197.0, 200.6, 204.4, 207.2, 209.0, 209, 210, 222, 223, 226, 227, 232, 231, 238, 237, 241, 243, 247, 245, 251, 254, 253, 256, 254, 257, 261, 262, 266, 264, 277, 268, 271, 272];


var input_count = 0;
function add_input() {
	input_count++;
	var inputhtml = `
	<div id="inputs${input_count}">
		<input type="text" class="textbox" id="compound${input_count}" placeholder="Compound" style="width: 80px">
		<input type="text" class="textbox" id="target${input_count}" placeholder="Target" style="width: 50px">
		<input type="text" class="textbox" id="reactant_mass${input_count}" placeholder="Reactant Mass" style="width: 100px">
		<input type="text" class="textbox" id="product_mass${input_count}" placeholder="Product Mass" style="width: 100px">
		<div class="textbox" id="info${input_count}" style="font-weight: normal; display: inline"></div>
	</div>
	`;
	document.getElementById("inputs").insertAdjacentHTML("beforeend", inputhtml);
}

function calculate() {
	let re = new RegExp("([A-Z][a-z]?[0-9]*)", "g");
	var empirical = new Array(111).fill(0);;

	for (var i = 1; i <= input_count; i++) {
		var molar_mass = 0;
		var array = new Array(111).fill(0);
		var compound = document.getElementById(`compound${i}`).value
		var target = document.getElementById(`target${i}`).value
		if (target) {
			var target = letters.indexOf(target);
		}
		var reactant_mass = document.getElementById(`reactant_mass${i}`).value
		var product_mass = document.getElementById(`product_mass${i}`).value
		if (!compound || !reactant_mass || !product_mass) {
			continue;
		}
		var oxygens = 0
		var oxygen_only = true;

		var match = compound.matchAll(re);
		for (item of match) {
			var molecule = String(item[0]).match(/^[A-Z][a-z]?/);
			var number = String(item[0]).match(/[0-9]+$/);
			var index = letters.indexOf(String(molecule))
			if (number == null) {
				number = 1
			}
			if (index == 7) {
				oxygens = mass[index] * number
				molar_mass = molar_mass + oxygens;
				array[7] = oxygens;
			} else {
				oxygen_only = false
				molar_mass = molar_mass + mass[index] * number;
				array[index] = mass[index] * number;
			}
		}
		if (!oxygen_only) {
			array[7] = 0;
		}
		var mols = 0;
		
		if (target) {
			mols = ((molar_mass-oxygens)*product_mass)/(molar_mass*reactant_mass*mass[target]);
			// document.getElementById(`info${i}`).innerHTML = mols;
			empirical[target] = mols;
		} else {
			for (var j = 0; j < array.length; j++) {
				if (array[j] != 0) {
					if (j == 7) {
						mols = product_mass/(reactant_mass*16);
					} else {
						mols = ((molar_mass-oxygens)*product_mass)/(molar_mass*reactant_mass*mass[j]);
					}
					// document.getElementById(`info${i}`).innerHTML = mols;
					empirical[j] = mols;
				}
			}
		}
	}

	let min = Math.min.apply(null, empirical.filter(Boolean));
	var fancy_string = "Empirical Formula: ";
	var temp = [];
	var num = 0;
	var mr = 0

	for (var i = 0; i < empirical.length; i++) {
		if (empirical[i] != 0) {
			num = Math.round(empirical[i]/min*10)/10;
			mr += num * mass[i]
			if (num == 1) {
				if (i == 5) {
					fancy_string = fancy_string + "C";
				} else {
					temp.push(letters[i]);
				}
			} else {
				if (i == 5) {
					fancy_string = fancy_string + "C<sub>" + String(num) + "</sub>";
				} else {
					temp.push(letters[i] + "<sub>" + String(num) + "</sub>");
				}
			}
		}
	}
	temp = temp.sort()
	for (var i = 0; i < temp.length; i++) {
		if (temp[i].startsWith("H<sub>")) {
			fancy_string = fancy_string + temp[0];
			temp[i] = "";
			break;
		}
	}

	fancy_string = fancy_string + temp.join("")

	document.getElementById("display").innerHTML = fancy_string;
	document.getElementById("display2").innerHTML = `Molar Mass: ${mr}`;
	// console.log(empirical);
	// document.getElementById("debug").innerHTML = empirical;

}
