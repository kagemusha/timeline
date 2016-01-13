import { makeObjects } from '../helpers';

const PROPS = ['event', 'year'];

const DATA = [
  ['Norman Invasion', 1066],
  ['Storming of the Bastille', 1789 ],
  ['Declaration of Independence', 1776],
  ['Magna Carta', 1215],
  ['Charlemagne crowned Holy Roman Emperor', 800],
  ['Death of Cleopatra', -30],
  ['Assassination of Caesar', -44],
  ['Spanish Armada', 1588],
  ['Outbreak of WWI', 1914],
  ['Onset of the Black Death in Europe', 1348],
  ['Battle of Austerlitz', 1805],
  ['Napoleon crowned Emperor', 1804],
  ['Communist Takeover of China', 1949],
  ['Napoleon invades Russia', 1812],
  ['Fall of Constatinople to the Turks', 1453],
  ['Invention of the Printing Press', 1440],
  ['Columbus discovers Americas', 1492],
  ['Destruction of Carthage', -146],
  ['Charles V crowned Holy Roman Emperor', 1530],
  ['First circumnavigation of the world', 1522],
  ['First flight', 1903],
  ['Death of Alexander the Great', -323],
  ['Athens surrenders to Sparta to end Peloponnesian War', -404],
  ["Luther's 95 Theses ushers in the Protestant Reformation", 1517],
  ['Suleiman the Magnificent besieges Vienna', 1529],
  ['Newton publishes law of gravitation', 1687],
  ['Battle of Waterloo', 1815],
  ['New Zealand first country to allow woemen to vote', 1893],
  ['Einstein announces theory of relativity', 1905],
  ['World War II begins with German invasion of Poland', 1939],
  ['First Moon Landing', 1969],
  ['Sputnik launch, first man-made satellite to orbit earth', 1957],
  ['Yuri Gagarin becomes first human in outer space', 1961],
  ['Sinking of the Titanic', 1913],
  //['',],
  //['',],
  //['',],
  //['',],
  //['',],

]


const objects = makeObjects(PROPS, DATA);
export default objects;
