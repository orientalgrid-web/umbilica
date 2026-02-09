import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Prayer = {
  id: string;
  title: string;
  tradition: string;
  theme: string;
  preview: string;
};

type Theme = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
};

export default function App() {
  const [dailyPrayer, setDailyPrayer] = useState<Prayer | null>(null);
  const [themes, setThemes] = useState<Theme[]>([
    { id: '1', name: 'Gratitude', icon: 'heart', color: '#4CAF50', description: 'Prayers of thankfulness' },
    { id: '2', name: 'Healing', icon: 'medkit', color: '#2196F3', description: 'For physical and emotional healing' },
    { id: '3', name: 'Peace', icon: 'leaf', color: '#9C27B0', description: 'Inner and outer peace' },
    { id: '4', name: 'Guidance', icon: 'compass', color: '#FF9800', description: 'Wisdom and direction' },
    { id: '5', name: 'Forgiveness', icon: 'refresh', color: '#E91E63', description: 'Mercy and repentance' },
    { id: '6', name: 'Strength', icon: 'fitness', color: '#795548', description: 'Courage and resilience' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDailyPrayer({
        id: '1',
        title: 'Prayer for Inner Peace',
        tradition: 'Buddhist',
        theme: 'Peace',
        preview: 'May all beings be happy. May all beings be healthy. May all beings experience prosperity. May none suffer.',
      });
      setLoading(false);
    }, 1500);
  }, []);

  const renderTheme = ({ item }: { item: Theme }) => (
    <TouchableOpacity 
      style={[styles.themeCard, { backgroundColor: item.color + '20' }]}
      onPress={() => alert(`Opening ${item.name} prayers`)}
    >
      <View style={[styles.themeIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon as any} size={24} color="white" />
      </View>
      <Text style={styles.themeName}>{item.name}</Text>
      <Text style={styles.themeDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.welcome}>Umbilica</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={32} color="#6D28D9" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Ancient prayers for modern souls</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" />
        <Text style={styles.searchPlaceholder}>Search prayers, themes, traditions...</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6D28D9" />
        <Text style={styles.loadingText}>Preparing your sanctuary...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {renderHeader()}
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Daily Prayer Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Prayer</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {dailyPrayer && (
            <TouchableOpacity style={styles.dailyCard} onPress={() => alert('Opening prayer details')}>
              <View style={styles.dailyHeader}>
                <View style={styles.traditionBadge}>
                  <Text style={styles.traditionText}>{dailyPrayer.tradition}</Text>
                </View>
                <Text style={styles.dailyTheme}>{dailyPrayer.theme}</Text>
              </View>
              <Text style={styles.dailyTitle}>{dailyPrayer.title}</Text>
              <Text style={styles.dailyPreview}>{dailyPrayer.preview}</Text>
              <View style={styles.dailyFooter}>
                <TouchableOpacity style={styles.playButton}>
                  <Ionicons name="play-circle" size={24} color="#6D28D9" />
                  <Text style={styles.playText}>Listen</Text>
                </TouchableOpacity>
                <View style={styles.dailyActions}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="bookmark-outline" size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="share-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Themes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse by Theme</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={themes}
            renderItem={renderTheme}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.themesList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#E0E7FF' }]}>
                <Ionicons name="journal" size={24} color="#4F46E5" />
              </View>
              <Text style={styles.actionText}>My Journal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="moon" size={24} color="#059669" />
              </View>
              <Text style={styles.actionText}>Evening Prayers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="sunny" size={24} color="#D97706" />
              </View>
              <Text style={styles.actionText}>Morning Prayers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Prayers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <View style={styles.recentPrayers}>
            <TouchableOpacity style={styles.recentPrayer}>
              <Ionicons name="time" size={16} color="#999" />
              <Text style={styles.recentPrayerText}>Evening Prayer - Christian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentPrayer}>
              <Ionicons name="time" size={16} color="#999" />
              <Text style={styles.recentPrayerText}>Meditation - Buddhist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentPrayer}>
              <Ionicons name="time" size={16} color="#999" />
              <Text style={styles.recentPrayerText}>Dua for Healing - Islamic</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Traditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Traditions</Text>
          <View style={styles.traditionsGrid}>
            <TouchableOpacity style={[styles.traditionCard, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="star" size={20} color="#D97706" />
              <Text style={styles.traditionName}>Buddhist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.traditionCard, { backgroundColor: '#E0E7FF' }]}>
              <Ionicons name="cross" size={20} color="#4F46E5" />
              <Text style={styles.traditionName}>Christian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.traditionCard, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="moon" size={20} color="#059669" />
              <Text style={styles.traditionName}>Islamic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.traditionCard, { backgroundColor: '#FCE7F3' }]}>
              <Ionicons name="flower" size={20} color="#DB2777" />
              <Text style={styles.traditionName}>Hindu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profileButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 14,
    color: '#999',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    color: '#6D28D9',
    fontWeight: '500',
  },
  dailyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  traditionBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  traditionText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '500',
  },
  dailyTheme: {
    color: '#666',
    fontSize: 14,
  },
  dailyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    lineHeight: 28,
  },
  dailyPreview: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  dailyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playText: {
    color: '#6D28D9',
    fontWeight: '600',
    fontSize: 15,
  },
  dailyActions: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  themesList: {
    paddingBottom: 8,
    gap: 16,
  },
  themeCard: {
    width: 160,
    padding: 20,
    borderRadius: 20,
    marginRight: 12,
  },
  themeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
    textAlign: 'center',
  },
  recentPrayers: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
  },
  recentPrayer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  recentPrayerText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#1A1A1A',
    flex: 1,
  },
  traditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  traditionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  traditionName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
});