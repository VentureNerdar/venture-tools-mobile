<template>
  <div>
    <VanTabs :active="activeTab" style="margin-top: 46px">
      <VanTab title="Contacts" name="contacts">
        <VanList>
          <VanCell
            v-for="(prayer, index) in prayers.contacts"
            :key="index"
            :title="prayer.name"
            :label="prayer.label"
          />
        </VanList>
      </VanTab>

      <VanTab title="Churches" name="churches">
        <VanList>
          <VanCell
            v-for="(prayer, index) in prayers.churches"
            :key="index"
            :title="prayer.name"
            :label="prayer.label"
          />
        </VanList>
      </VanTab>
    </VanTabs>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "application",
});

const activeTab = ref(0);

const prayers = {
  contacts: [
    { name: "John Doe", label: "Lord, guide us today." },
    { name: "Jane Smith", label: "Bless our families and friends." },
    { name: "Alice Johnson", label: "Grant us peace and strength." },
    { name: "Bob Brown", label: "Heal those who are suffering." },
    { name: "Charlie Davis", label: "Thank you for your endless love." },
    { name: "Diana Evans", label: "Protect us from harm." },
    { name: "Ethan Foster", label: "Help us to forgive others." },
    { name: "Fiona Green", label: "Fill our hearts with joy." },
    { name: "George Harris", label: "Lead us in your wisdom." },
    { name: "Hannah Irving", label: "Provide for those in need." },
    { name: "Ian Jackson", label: "Comfort the brokenhearted." },
    { name: "Julia King", label: "Give us courage to face challenges." },
    { name: "Kevin Lewis", label: "Bless the work of our hands." },
    { name: "Laura Miller", label: "Help us to trust in you." },
    { name: "Michael Nelson", label: "Shower us with your grace." },
    { name: "Nina Owens", label: "Teach us to love unconditionally." },
    { name: "Oliver Parker", label: "Guide our leaders with wisdom." },
    { name: "Paula Quinn", label: "Bring unity to our communities." },
    { name: "Quincy Roberts", label: "Help us to walk in faith." },
    { name: "Rachel Scott", label: "Thank you for your blessings." },
  ],
  churches: [
    { name: "St. Peter's Church", label: "Strengthen our faith in trials." },
    {
      name: "Grace Community Church",
      label: "Help us to be kind and patient.",
    },
    { name: "First Baptist Church", label: "Bless the children of the world." },
    { name: "Holy Trinity Church", label: "Give us hope for tomorrow." },
    { name: "New Life Church", label: "Help us to serve others selflessly." },
    { name: "Faith Chapel", label: "Thank you for your mercy." },
    { name: "Living Waters Church", label: "Bring healing to the sick." },
    { name: "Cornerstone Church", label: "Help us to find peace in you." },
    { name: "Hope Church", label: "Bless our homes with love." },
    { name: "Christ the King Church", label: "Guide us in your truth." },
    { name: "Redeemer Church", label: "Help us to forgive and love." },
    { name: "Victory Church", label: "Grant us your divine wisdom." },
    { name: "Crossroads Church", label: "Protect us from all evil." },
    { name: "Harvest Church", label: "Fill our hearts with gratitude." },
    { name: "The Rock Church", label: "Bless our community with peace." },
    { name: "River of Life Church", label: "Help us to walk in humility." },
    { name: "Calvary Church", label: "Thank you for your endless grace." },
    { name: "Unity Church", label: "Guide us to be a light to others." },
    { name: "Abundant Life Church", label: "Bless our leaders with wisdom." },
    { name: "Bethlehem Church", label: "Help us to trust in your plan." },
  ],
};
</script>
