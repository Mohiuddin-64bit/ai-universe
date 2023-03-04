const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools.slice(0, 6)));
};

const displayData = (data) => {
  const cards = document.getElementById("cards");
  data.forEach((allData) => {
    const { image, name, features, published_in, id } = allData;
    const list = features.map((feature) => `<li>${feature}</li>`).join("");
    cards.innerHTML += `
    <div class="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
      <figure><img src='${image}' alt="Shoes" /></figure>
      <div class="card-body">
        <h3 class="font-bold text-lg">Features</h3>
        <ol class="list-decimal ml-5">
          ${list}
        </ol>
        <hr class="my-5"/>
        <div class="card-actions justify-between">
        <div>
          <h2 class="card-title">${name}</h2>
          <div class="flex items-center gap-3">
            <i class="fa-regular fa-calendar-days"></i>
            <p>${published_in}</p>
          </div>
          </div>
          <label for="ai-modal" onclick="singleData('${id}')" class="btn btn-secondary btn-outline"><i class="fa-solid fa-right-to-bracket"></i></label>
        </div>
      </div>
    </div>
    `;
  });
};

// Data for Modal section

const singleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => singleDataDisplay(data.data));
};

const singleDataDisplay = (data) => {
  console.log(data);
  const {
    image_link,
    features,
    description,
    integrations,
    pricing,
    input_output_examples,
    accuracy,
  } = data;
  const PricingSection = pricing
    .map(
      (item) =>
        `<div class="text-center bg-pink-300 text-pink-500 rounded">${
          item.price ? item.price : "Free of cost"
        } ${item.plan} </div>`
    )
    .join("");
  // Feature List
  let featuresArray = Object.values(features);
  const featureList = featuresArray
    .map((feature) => `<li>${feature.feature_name}</li>`)
    .join("");
  // integrations List
  const integrationsList = integrations
    .map((integrate) => `<li>${integrate ? integrate : "No Data Found"}</li>`)
    .join("");
  // Text under the photo
  const input = input_output_examples[0].input;
  const output = input_output_examples[0].output;
  // Accuracy show
  var score = accuracy.score;
  if (score == null) {
    var accuracyText = "";
  } else {
    var accuracyText = `<p class="absolute bg-red-300 right-0 p-2 rounded top-0">Accuracy ${score}</p>`;
  }
  console.log(input, output);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <div class="grid grid-cols-2 p-12 gap-6">
    <div class="border-2 p-5 rounded-lg bg-pink-100">
      <div class="w-full mb-8">
        <h3 class="font-bold text-lg">${description}</h3>
      </div>
      <div class="flex gap-2">
        ${PricingSection}
      </div>
      <div class="mt-8 gap-8 flex">
        <div>
          <h3 class="font-bold text-3xl">Features</h3>
          <ol class="list-decimal ml-5">
            ${featureList}
          </ol>
        </div>
        <div>
        <h3 class="font-bold text-3xl">integrations</h3>
        <ol class="list-decimal ml-5">
          ${integrationsList}
        </ol>
        </div>
      </div>
    </div>
    <div class="mx-auto border-2 p-8 rounded-lg">
      <div class="relative">
        <img class="w-full rounded-lg mb-4 " src="${image_link[0]}" />
        ${accuracyText}
      </div>
      <h2 class="font-bold text-center text-2xl mb-2">${input}</h2>
      <p class="text-center text-gray-500">${
        output ? output : "No!Not Yet! Take a break!!!"
      }</p>
    </div>
  </div>
  <div id="modal-action" class="modal-action">
    <label for="ai-modal" class="btn btn-secondary btn-outline">close!</label>
  </div>

  `;
};

const showAllCard = () => {
  const showAllBtn = document.getElementById("show-all");
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools.slice(6)));
  showAllBtn.style.display = "hidden"
}

loadData();
